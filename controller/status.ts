import { FightInfo, historyContextEnum } from "../interfaces/history.js";
import { Instance } from "../interfaces/instance.js";
import { modCause } from "../interfaces/modification.js";
import { MonsterFighting, monsterStatsEnum } from "../interfaces/monster.js";
import { effectInterface, skillCostEnum } from "../interfaces/skill.js";
import {
	canBeReApply,
	hasEffectAtTheEndOfRound,
	hasEffectOnApply,
	hasEffectOnRemove,
	listOfStatus,
	statusConst,
	statusInterface,
	statusName,
	statusNameType,
} from "../interfaces/status.js";
import { deathCheckMonster } from "./death.js";
import {
	getSkillModByStatus,
	hasSkillModStatus,
	removeModOnSkill,
	updateModOnSkill,
} from "./modification.js";
import { refillStat } from "./monsterStat.js";

const rollStatusEndRound = (instance: Instance) => {
	instance.players.forEach((player) => {
		player.onBoard.forEach((monster) => {
			if (monster.isAlive === true) {
				monster.statuses.forEach((status) => {
					if (
						Object.values<statusNameType>(
							hasEffectAtTheEndOfRound,
						).includes(status.name)
					) {
						_statusEffectsEndRound(instance.fightInfo, monster)[
							status.name
						]();
					}

					if (status.nbrRound-- === 1) {
						removeStatus(instance.fightInfo, monster, status.name);
					}
				});
				deathCheckMonster(instance, monster);
			}
		});
	});
};

const _statusEffectsEndRound = (
	fightInfo: FightInfo,
	monster: MonsterFighting,
) => {
	const burned = () => {
		monster.stats.hp -= monster.starting.hp * statusConst.BURNED;
		fightInfo.updateHistory({
			context: historyContextEnum.DAMAGE,
			content: {
				targetMonster: fightInfo.convertMonsterToHistory(monster),
				statusName: statusName.BURNED,
				statName: monsterStatsEnum.HP,
				statChanges: monster.starting.hp * statusConst.BURNED,
			},
		});
	};

	const poisoned = () => {
		monster.stats.hp -= monster.starting.hp * statusConst.POISONED;
		fightInfo.updateHistory({
			context: historyContextEnum.DAMAGE,
			content: {
				targetMonster: fightInfo.convertMonsterToHistory(monster),
				statusName: statusName.POISONED,
				statName: monsterStatsEnum.HP,
				statChanges: monster.starting.hp * statusConst.POISONED,
			},
		});
	};

	const regenerated = () => {
		refillStat()[monsterStatsEnum.HP](
			monster,
			monster.starting.hp * statusConst.REGENERATED,
		);
		fightInfo.updateHistory({
			context: historyContextEnum.HEAL,
			content: {
				targetMonster: fightInfo.convertMonsterToHistory(monster),
				statusName: statusName.REGENERATED,
				statName: monsterStatsEnum.HP,
				statChanges: monster.starting.hp * statusConst.REGENERATED,
			},
		});
	};

	return { burned, poisoned, regenerated };
};

const buildStatus = (
	name: statusNameType,
	nbrRound: number,
): statusInterface => {
	return {
		name: name,
		nbrRound: nbrRound,
	};
};

const pushStatus = (
	fightInfo: FightInfo,
	monster: MonsterFighting,
	status: statusInterface,
) => {
	monster.statuses.push(status);

	fightInfo.updateHistory({
		context: historyContextEnum.STATUS,
		content: {
			targetMonster: fightInfo.convertMonsterToHistory(monster),
			statusName: status.name,
			nbrRound: status.nbrRound,
		},
	});
};

const applyStatus = (
	fightInfo: FightInfo,
	monster: MonsterFighting,
	effect: effectInterface,
) => {
	const statusToApply = buildStatus(effect.status, effect.power);
	if (
		monster.statuses.some(
			(monsterStatus) => monsterStatus.name === statusToApply.name,
		) &&
		!isStatusFromList(statusToApply.name, canBeReApply)
	) {
		fightInfo.updateHistory({
			context: historyContextEnum.STATUS,
			content: {
				targetMonster: fightInfo.convertMonsterToHistory(monster),
				statusName: statusToApply.name,
				nbrRound: 0,
			},
		});
	} else {
		if (!isStatusFromList(effect.status, hasEffectOnApply))
			pushStatus(
				fightInfo,
				monster,
				buildStatus(effect.status, effect.power),
			);
		else
			_statusEffectsOnApply()[statusToApply.name](
				fightInfo,
				monster,
				effect,
			);
	}
};

const _statusEffectsOnApply = () => {
	const cold = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		effect: effectInterface,
	) => {
		if (!hasStatus(monster, statusName.COLD)) {
			pushStatus(
				fightInfo,
				monster,
				buildStatus(statusName.COLD, effect.power),
			);
		} else {
			const nbrRound =
				getStatus(monster, statusName.COLD).nbrRound + effect.power;
			removeStatus(fightInfo, monster, statusName.COLD);
			pushStatus(
				fightInfo,
				monster,
				buildStatus(statusName.FROZEN, nbrRound),
			);
		}
	};

	const exhausted = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		effect: effectInterface,
	) => {
		if (hasStatus(monster, statusName.INVIGORATED)) {
			removeStatus(fightInfo, monster, statusName.INVIGORATED);
		} else {
			pushStatus(
				fightInfo,
				monster,
				buildStatus(hasEffectOnApply.EXHAUSTED, effect.power),
			);

			monster.skills.forEach((skill) => {
				if (skill.cost.type === skillCostEnum.STAMINA) {
					const update = skill.cost.value * statusConst.EXHAUSTED;
					skill.cost.value -= update;
					updateModOnSkill(skill, {
						cause: modCause.STATUS,
						content: {
							status: hasEffectOnApply.EXHAUSTED,
							value: update,
						},
					});
				}
			});
		}
	};

	const invigorated = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		effect: effectInterface,
	) => {
		if (hasStatus(monster, statusName.EXHAUSTED)) {
			removeStatus(fightInfo, monster, statusName.EXHAUSTED);
		} else {
			pushStatus(
				fightInfo,
				monster,
				buildStatus(hasEffectOnApply.INVIGORATED, effect.power),
			);
			monster.skills.forEach((skill) => {
				const update = skill.cost.value * statusConst.INVIGORATED;
				skill.cost.value -= update;
				updateModOnSkill(skill, {
					cause: modCause.STATUS,
					content: {
						status: hasEffectOnApply.INVIGORATED,
						value: update,
					},
				});
			});
		}
	};

	return { cold, exhausted, invigorated };
};

const removeStatus = (
	fightInfo: FightInfo,
	monster: MonsterFighting,
	status: statusNameType,
) => {
	if (hasStatus(monster, status)) {
		if (!isStatusFromList(status, hasEffectOnRemove)) {
			_removeStatus(monster, status);
		} else {
			_statusEffectsOnRemove()[status](monster);
		}

		fightInfo.updateHistory({
			context: historyContextEnum.STATUS,
			content: {
				targetMonster: fightInfo.convertMonsterToHistory(monster),
				statusName: status,
				nbrRound: -1,
			},
		});
	}
};

const _statusEffectsOnRemove = () => {
	const exhausted = (monster: MonsterFighting) => {
		_removeStatus(monster, statusName.EXHAUSTED);
		monster.skills.forEach((skill) => {
			if (hasSkillModStatus(skill, hasEffectOnApply.EXHAUSTED)) {
				const mod = getSkillModByStatus(
					skill,
					hasEffectOnApply.EXHAUSTED,
				);
				skill.cost.value += mod.content.value;
				removeModOnSkill(skill, mod);
			}
		});
	};

	const invigorated = (monster: MonsterFighting) => {
		_removeStatus(monster, statusName.INVIGORATED);
		monster.skills.forEach((skill) => {
			if (hasSkillModStatus(skill, hasEffectOnApply.INVIGORATED)) {
				const mod = getSkillModByStatus(
					skill,
					hasEffectOnApply.INVIGORATED,
				);
				skill.cost.value += mod.content.value;
				removeModOnSkill(skill, mod);
			}
		});
	};

	return { exhausted, invigorated };
};

const _removeStatus = (monster: MonsterFighting, status: statusNameType) => {
	monster.statuses.splice(
		monster.statuses.indexOf(monster.statuses[status]),
		1,
	);
};

const isStatusFromList = (
	status: statusNameType,
	statusList: listOfStatus,
): boolean => {
	return Object.values<statusNameType>(statusList).includes(status);
};

const hasStatusFromList = (
	monster: MonsterFighting,
	statusList: listOfStatus,
): boolean => {
	return monster.statuses.some((status) =>
		Object.values<statusNameType>(statusList).includes(status.name),
	);
};

const hasStatus = (
	monster: MonsterFighting,
	status: statusNameType,
): boolean => {
	return monster.statuses.some((status) => status.name === status.name);
};

const getStatus = (
	monster: MonsterFighting,
	statusName: statusNameType,
): statusInterface => {
	return monster.statuses.find((status) => status.name === statusName);
};

export {
	rollStatusEndRound,
	buildStatus,
	applyStatus,
	hasStatusFromList,
	hasStatus,
};
