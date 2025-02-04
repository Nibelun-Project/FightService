import { actionInterface } from "../interfaces/action.js";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { MonsterFightingInterface, monsterStatsEnum } from "../interfaces/monster.js";
import { effectInterface } from "../interfaces/skill.js";
import { deathCheckActionTaget } from "./death.js";
import { convertMonsterToHistory, convertSkillToHistory, updateHistory } from "./history.js";
import { getActionByMonsterID, getOnBoardMonsterByID, getPlayerByID, isAvailableToPlayRound } from "./instance.js";
import { getTypeEfficiency, isSTAB } from "./monsterType.js";
import { passif } from "./passif.js";
import { applyStatus } from "./status.js";
import { getTargeting } from "./targeting.js";

const doAction = (instance: instanceInterface, monsterID: string) => {
    if (isAvailableToPlayRound(instance, monsterID)) {
        const actionFromMonster = getActionByMonsterID(instance, monsterID);

        //Loop through skill effects			
        actionFromMonster.skill.effects.forEach((effect) => {
            const effectTargets = getTargeting(instance, actionFromMonster, effect.targetType);
            effectTargets.forEach((target: actionInterface) => {
                passif(effectsType()[effect.type], target, effect, instance)
                return !deathCheckActionTaget(instance, target);
            })

        });
    }
};

const effectsType = () => {
    const damage = (instance: instanceInterface, actionsByTarget: actionInterface, effect: effectInterface) => {
        console.log(
            "damage from ",
            actionsByTarget.sourceID,
            " to ",
            actionsByTarget.targetInfo
        );
        _doCalculDamage(instance, actionsByTarget, effect.power);
    };

    const status = (instance: instanceInterface, actionsByTarget: actionInterface, effect: effectInterface) => {
        console.log(
            effect.status,
            " from ",
            actionsByTarget.sourceID,
            " to ",
            actionsByTarget.targetInfo
        );
        applyStatus(instance, actionsByTarget, effect);
    }

    
    const swap = (instance: instanceInterface, actionsByTarget: actionInterface) => {
        console.log(
            "swap on",
            actionsByTarget.sourceID,
            " with ",
            actionsByTarget.targetInfo
        );
        _swapOnBoard(instance, actionsByTarget);
    };

    return { damage, status, swap };
};

const _doCalculDamage = (instance: instanceInterface, target: actionInterface, power: number): MonsterFightingInterface => {
    const skill = target.skill;
    const monsterSource = getOnBoardMonsterByID(instance, target.sourceID);
    const monsterTarget = getPlayerByID(target.targetInfo.targetedPlayerID, instance).onBoard[target.targetInfo.spot];
    const typeEfficiency = getTypeEfficiency(skill.type, monsterTarget.type);
    const stab = isSTAB(monsterSource.type, skill.type);

    const hpChanges =
        -(
            (
                (monsterSource.stats[monsterStatsEnum.ATK] * power) / // source
                (monsterTarget.stats[monsterStatsEnum.DEF]) // target
            )
        ) *
        (typeEfficiency * stab); // multiplying factor
    monsterTarget.stats[monsterStatsEnum.HP] += hpChanges;

    updateHistory(instance, {
        context: historyContextEnum.DAMAGE,
        content: {
            monster: convertMonsterToHistory(monsterSource), skill: convertSkillToHistory(skill), typeEfficiency: typeEfficiency,
            isSTAB: stab, targetMonster: convertMonsterToHistory(monsterTarget), statName: monsterStatsEnum.HP, statChanges: hpChanges
        }
    })

    return monsterTarget;
};

const _swapOnBoard = (instance: instanceInterface, actionsByTarget: actionInterface) => {
    const sourceMonster = getOnBoardMonsterByID(instance, actionsByTarget.sourceID);
    const player = getPlayerByID(sourceMonster.playerID, instance)
    const teamSourceMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === actionsByTarget.sourceID);
    player.team[teamSourceMonsterIndex] = sourceMonster;

    const teamTargetMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === actionsByTarget.targetInfo.id);
    const onBoardSourceMonsterIndex = player.onBoard.findIndex((onBoardMonster) => onBoardMonster.id === actionsByTarget.sourceID);
    player.onBoard[onBoardSourceMonsterIndex] = player.team[teamTargetMonsterIndex];

    updateHistory(instance, {
        context: historyContextEnum.SWAP,
        content: { monster: convertMonsterToHistory(sourceMonster), targetMonster: convertMonsterToHistory(player.team[teamTargetMonsterIndex]) }
    });
};


export {
    effectsType,
    doAction,
}