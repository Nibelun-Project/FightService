import { actionInterface } from "../interfaces/action.js";
import {
	fightInfoInterface,
	historyContextEnum,
} from "../interfaces/history.js";
import { Instance } from "../interfaces/instance.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
} from "../interfaces/monster.js";
import { effectInterface } from "../interfaces/skill.js";
import { deathCheckActionTaget } from "./death.js";
import {
	convertMonsterToHistory,
	convertSkillToHistory,
	updateHistory,
} from "./history.js";
import {
	getActionByMonsterID,
	getPlayerByMonsterID,
	isAvailableToPlayRound,
} from "./instance.js";
import { getTypeEfficiency, isSTAB } from "./monsterType.js";
import { passif } from "./passif.js";
import { paySkillCost } from "./skill.js";
import { applyStatus } from "./status.js";
import { getTargeting } from "./targeting.js";

const doAction = (instance: Instance, monsterID: string) => {
	if (isAvailableToPlayRound(instance, monsterID)) {
		const sourcePlayer = getPlayerByMonsterID(monsterID, instance);
		const sourceMonster = sourcePlayer.getOnBoardMonsterByID(monsterID);
		const actionFromMonster = getActionByMonsterID(instance, monsterID);
		actionFromMonster.source = sourceMonster;

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
				return !deathCheckActionTaget(instance, target);
			});
		});
	}
};

const effectsType = () => {
	const damage = (
		fightInfo: fightInfoInterface,
		actionsByTarget: actionInterface,
		effect: effectInterface,
	) => {
		_doCalculDamage(fightInfo, actionsByTarget, effect.power);
	};

	const status = (
		fightInfo: fightInfoInterface,
		actionsByTarget: actionInterface,
		effect: effectInterface,
	) => {
		const monster = actionsByTarget.target;
		applyStatus(fightInfo, monster, effect);
	};

	const swap = (
		fightInfo: fightInfoInterface,
		actionsByTarget: actionInterface,
	) => {
		_swapOnBoard(fightInfo, actionsByTarget);
	};

	return { damage, status, swap };
};

const _doCalculDamage = (
	fightInfo: fightInfoInterface,
	action: actionInterface,
	power: number,
): MonsterFightingInterface => {
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

	updateHistory(fightInfo, {
		context: historyContextEnum.DAMAGE,
		content: {
			monster: convertMonsterToHistory(monsterSource),
			skill: convertSkillToHistory(skill),
			typeEfficiency: typeEfficiency,
			isSTAB: stab,
			targetMonster: convertMonsterToHistory(monsterTarget),
			statName: monsterStatsEnum.HP,
			statChanges: hpChanges,
		},
	});

	return monsterTarget;
};

const _swapOnBoard = (
	fightInfo: fightInfoInterface,
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

	updateHistory(fightInfo, {
		context: historyContextEnum.SWAP,
		content: {
			monster: convertMonsterToHistory(actionsByTarget.source),
			targetMonster: convertMonsterToHistory(
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
