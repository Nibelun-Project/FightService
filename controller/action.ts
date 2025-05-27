import { actionInterface } from "../interfaces/action.js";
import { FightInfo, historyContextEnum } from "../interfaces/history.js";
import { Instance } from "../interfaces/instance.js";
import { MonsterFighting, monsterStatsEnum } from "../interfaces/monster.js";
import { effectInterface } from "../interfaces/skill.js";
import { deathCheckActionTaget } from "./death.js";
import { getTypeEfficiency, isSTAB } from "./monsterType.js";
import { passif } from "./passif.js";
import { paySkillCost } from "./skill.js";
import { applyStatus } from "./status.js";
import { getTargeting } from "./targeting.js";

const doAction = (instance: Instance, monsterID: string) => {
	const sourcePlayer = instance.getPlayerByMonsterID(monsterID);
	const actionFromMonster = instance.getActionByMonsterID(monsterID);
	const sourceMonster = sourcePlayer.getOnBoardMonsterByID(monsterID);
	actionFromMonster.source = sourceMonster;
	if (
		sourcePlayer.isAvailableToPlayRound(
			instance.fightInfo,
			sourceMonster,
			actionFromMonster,
		)
	) {
		paySkillCost(
			instance.fightInfo,
			sourceMonster,
			actionFromMonster.skill,
		);
		//Loop through skill effects
		actionFromMonster.skill.effects.forEach((effect) => {
			const effectTargets = getTargeting(
				instance,
				actionFromMonster,
				effect.targetType,
			);
			effectTargets.forEach((target: actionInterface) => {
				passif(effectsType()[effect.type], target, effect, instance);
				instance
					.getPlayerByID(target.targetInfo.targetedPlayerID)
					.deathCheckActionTarget(instance.fightInfo, target);
				return !deathCheckActionTaget(instance, target);
			});
		});
	}
};

const effectsType = () => {
	const damage = (
		fightInfo: FightInfo,
		actionsByTarget: actionInterface,
		effect: effectInterface,
	) => {
		_doCalculDamage(fightInfo, actionsByTarget, effect.power);
	};

	const status = (
		fightInfo: FightInfo,
		actionsByTarget: actionInterface,
		effect: effectInterface,
	) => {
		const monster = actionsByTarget.target;
		applyStatus(fightInfo, monster, effect);
	};

	const swap = (fightInfo: FightInfo, actionsByTarget: actionInterface) => {
		_swapOnBoard(fightInfo, actionsByTarget);
	};

	return { damage, status, swap };
};

const _doCalculDamage = (
	fightInfo: FightInfo,
	action: actionInterface,
	power: number,
): MonsterFighting => {
	const skill = action.skill;
	const monsterSource = action.source;
	const monsterTarget = action.target;
	const typeEfficiency = getTypeEfficiency(skill.type, monsterTarget.type);
	const stab = isSTAB(monsterSource.type, skill.type);

	const hpChanges =
		-(
			(
				(monsterSource.stats[monsterStatsEnum.ATK] * power) / // source
				monsterTarget.stats[monsterStatsEnum.DEF]
			) // target
		) *
		(typeEfficiency * stab); // multiplying factor
	monsterTarget.stats[monsterStatsEnum.HP] += hpChanges;

	fightInfo.updateHistory({
		context: historyContextEnum.DAMAGE,
		content: {
			monster: fightInfo.convertMonsterToHistory(monsterSource),
			skill: fightInfo.convertSkillToHistory(skill),
			typeEfficiency: typeEfficiency,
			isSTAB: stab,
			targetMonster: fightInfo.convertMonsterToHistory(monsterTarget),
			statName: monsterStatsEnum.HP,
			statChanges: hpChanges,
		},
	});

	return monsterTarget;
};

const _swapOnBoard = (
	fightInfo: FightInfo,
	actionsByTarget: actionInterface,
) => {
	const teamSourceMonsterIndex = actionsByTarget.targetTeam.findIndex(
		(teamMonster) => teamMonster.id === actionsByTarget.sourceID,
	);
	const teamTargetMonsterIndex = actionsByTarget.targetTeam.findIndex(
		(teamMonster) => teamMonster.id === actionsByTarget.targetInfo.id,
	);

	actionsByTarget.source.skills = actionsByTarget.source.startSkills;
	actionsByTarget.targetTeam[teamSourceMonsterIndex] = actionsByTarget.source;

	actionsByTarget.source = actionsByTarget.targetTeam[teamTargetMonsterIndex];

	fightInfo.updateHistory({
		context: historyContextEnum.SWAP,
		content: {
			monster: fightInfo.convertMonsterToHistory(actionsByTarget.source),
			targetMonster: fightInfo.convertMonsterToHistory(
				actionsByTarget.targetTeam[teamTargetMonsterIndex],
			),
		},
	});
};

const clearActions = (instance: Instance) => {
	instance.players.forEach((player) => {
		player.actions = [];
	});
};

export { effectsType, clearActions, doAction };
