import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { modCause } from "../interfaces/modification.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
} from "../interfaces/monster.js";
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
import { convertMonsterToHistory, updateHistory } from "./history.js";
import {
	getSkillModByStatus,
	hasSkillModStatus,
	removeModOnSkill,
	updateModOnSkill,
} from "./modification.js";
import { refillStat } from "./monsterStat.js";

const rollStatusEndRound = (instance: instanceInterface) => {
	instance.players.forEach((player) => {
		player.onBoard.forEach((monster) => {
			if (monster.isAlive === true) {
				monster.statuses.forEach((status) => {
					if (
						Object.values<statusNameType>(
							hasEffectAtTheEndOfRound,
						).includes(status.name)
					) {
						_statusEffectsEndRound(instance, monster)[
							status.name
						]();
					}

					if (status.nbrRound-- === 1) {
						removeStatus(instance, monster, status.name);
					}
				});
				deathCheckMonster(instance, monster);
			}
		});
	});
};

const _statusEffectsEndRound = (
	instance: instanceInterface,
	monster: MonsterFightingInterface,
) => {
	const burned = () => {
		monster.stats.hp -= monster.starting.hp * statusConst.BURNED;
		updateHistory(instance, {
			context: historyContextEnum.DAMAGE,
			content: {
				targetMonster: convertMonsterToHistory(monster),
				statusName: statusName.BURNED,
				statName: monsterStatsEnum.HP,
				statChanges: monster.starting.hp * statusConst.BURNED,
			},
		});
	};

	const poisoned = () => {
		monster.stats.hp -= monster.starting.hp * statusConst.POISONED;
		updateHistory(instance, {
			context: historyContextEnum.DAMAGE,
			content: {
				targetMonster: convertMonsterToHistory(monster),
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
		updateHistory(instance, {
			context: historyContextEnum.HEAL,
			content: {
				targetMonster: convertMonsterToHistory(monster),
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
	instance: instanceInterface,
	monster: MonsterFightingInterface,
	status: statusInterface,
) => {
	monster.statuses.push(status);

	updateHistory(instance, {
		context: historyContextEnum.STATUS,
		content: {
			targetMonster: convertMonsterToHistory(monster),
			statusName: status.name,
			nbrRound: status.nbrRound,
		},
	});
};

const applyStatus = (
	instance: instanceInterface,
	monster: MonsterFightingInterface,
	effect: effectInterface,
) => {
	const statusToApply = buildStatus(effect.status, effect.power);
	if (
		monster.statuses.some(
			(monsterStatus) => monsterStatus.name === statusToApply.name,
		) &&
		!isStatusFromList(statusToApply.name, canBeReApply)
	) {
		updateHistory(instance, {
			context: historyContextEnum.STATUS,
			content: {
				targetMonster: convertMonsterToHistory(monster),
				statusName: statusToApply.name,
				nbrRound: 0,
			},
		});
	} else {
		_statusEffectsOnApply()[statusToApply.name](instance, monster, effect);
	}
};

const _statusEffectsOnApply = () => {
	const cold = (
		instance: instanceInterface,
		monster: MonsterFightingInterface,
		effect: effectInterface,
	) => {
		if (!hasStatus(monster, statusName.COLD)) {
			pushStatus(
				instance,
				monster,
				buildStatus(statusName.COLD, effect.power),
			);
		} else {
			const nbrRound =
				getStatus(monster, statusName.COLD).nbrRound + effect.power;
			removeStatus(instance, monster, statusName.COLD);
			pushStatus(
				instance,
				monster,
				buildStatus(statusName.FROZEN, nbrRound),
			);
		}
	};

	const exhausted = (
		instance: instanceInterface,
		monster: MonsterFightingInterface,
		effect: effectInterface,
	) => {
		if (hasStatus(monster, statusName.INVIGORATED)) {
			removeStatus(instance, monster, statusName.INVIGORATED);
		} else {
			pushStatus(
				instance,
				monster,
				buildStatus(hasEffectOnApply.EXHAUSTED, effect.power),
			);

			monster.skills.forEach((skill) => {
				if (skill.cost.type === skillCostEnum.STAMINA) {
					const update = skill.cost.value * statusConst.EXHAUSTED;
					skill.cost.value += update;
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
		instance: instanceInterface,
		monster: MonsterFightingInterface,
		effect: effectInterface,
	) => {
		if (hasStatus(monster, statusName.EXHAUSTED)) {
			removeStatus(instance, monster, statusName.EXHAUSTED);
		} else {
			pushStatus(
				instance,
				monster,
				buildStatus(hasEffectOnApply.INVIGORATED, effect.power),
			);
			monster.skills.forEach((skill) => {
				const update = skill.cost.value * statusConst.INVIGORATED;
				skill.cost.value += update;
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
	instance: instanceInterface,
	monster: MonsterFightingInterface,
	status: statusNameType,
) => {
	if (hasStatus(monster, status)) {
		if (!isStatusFromList(status, hasEffectOnRemove)) {
			_removeStatus(monster, status);
		} else {
			_statusEffectsOnRemove()[status](monster);
		}

		updateHistory(instance, {
			context: historyContextEnum.STATUS,
			content: {
				targetMonster: convertMonsterToHistory(monster),
				statusName: status,
				nbrRound: -1,
			},
		});
	}
};

const _statusEffectsOnRemove = () => {
	const exhausted = (monster: MonsterFightingInterface) => {
		_removeStatus(monster, hasEffectOnApply.EXHAUSTED);
		monster.skills.forEach((skill) => {
			if (hasSkillModStatus(skill, hasEffectOnApply.EXHAUSTED)) {
				const mod = getSkillModByStatus(
					skill,
					hasEffectOnApply.EXHAUSTED,
				);
				skill.cost.value -= mod.content.value;
				removeModOnSkill(skill, mod);
			}
		});
	};

	const invigorated = (monster: MonsterFightingInterface) => {
		_removeStatus(monster, hasEffectOnApply.INVIGORATED);
		monster.skills.forEach((skill) => {
			const mod = getSkillModByStatus(
				skill,
				hasEffectOnApply.INVIGORATED,
			);

			removeModOnSkill(skill, mod);
		});
	};

	return { exhausted, invigorated };
};

const _removeStatus = (
	monster: MonsterFightingInterface,
	status: statusNameType,
) => {
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
	monster: MonsterFightingInterface,
	statusList: listOfStatus,
): boolean => {
	return monster.statuses.some((status) =>
		Object.values<statusNameType>(statusList).includes(status.name),
	);
};

const hasStatus = (
	monster: MonsterFightingInterface,
	status: statusNameType,
): boolean => {
	return monster.statuses.some((status) => status.name === status.name);
};

const getStatus = (
	monster: MonsterFightingInterface,
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
