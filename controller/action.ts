import { actionInterface } from "../interfaces/action";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance";
import { MonsterFightingInterface, monsterStatsEnum, monsterType } from "../interfaces/monster.js";
import { statusName } from "../interfaces/status.js";
import { convertMonsterToHistory, convertSkillToHistory, updateHistory } from "./history.js";
import { checkEndgame, getActionByMonsterID, getOnBoardMonsterByID, getPlayerByID, isAvailableToPlayRound } from "./instance.js";
import { passif } from "./passif.js";
import { applyStatus, buildStatus } from "./status.js";
import { getTargeting } from "./targeting.js";

const doAction = (instance: instanceInterface, monsterID: string) => {
    if (isAvailableToPlayRound(instance, monsterID)) {
        const actionFromMonster = getActionByMonsterID(instance, monsterID);

        //Loop through skill effects			
        actionFromMonster.skill.effects.forEach((effect) => {
            const effectTargets = getTargeting(instance, actionFromMonster, effect.targetType);
            effectTargets.forEach((target) => {
                passif(effectsType()[effect.type], target, effect.power, effect.type, instance)
                return !deathCheck(instance, target);
            })

        });
    }
};

const effectsType = () => {
    const damage = (instance: instanceInterface, actionsByTarget: actionInterface, power: number) => {
        console.log(
            "damage from ",
            actionsByTarget.sourceID,
            " to ",
            actionsByTarget.targetInfo
        );
        _doCalculDamage(instance, actionsByTarget, power);
    };

    const poison = (instance, actionsByTarget, power) => {
        console.log(
            "poison from",
            actionsByTarget.sourceID,
            " to ",
            actionsByTarget.targetInfo
        );
        _applyPoison(instance, actionsByTarget, power);
    }

    const swap = (instance, actionsByTarget) => {
        console.log(
            "swap on",
            actionsByTarget.sourceID,
            " with ",
            actionsByTarget.targetInfo
        );
        _swapOnBoard(instance, actionsByTarget);
    };

    return { damage, poison, swap };
};

const _doCalculDamage = (instance: instanceInterface, target: actionInterface, power: number): MonsterFightingInterface => {
    const skill = target.skill;
    const monsterSource = getOnBoardMonsterByID(instance, target.sourceID);
    const monsterTarget = getPlayerByID(target.targetInfo.targetedPlayerID, instance).onBoard[target.targetInfo.spot];
    const typeEfficiency = _getTypeEfficiency(skill.type, monsterTarget.type);
    const isSTAB = _isSTAB(monsterSource.type, skill.type);

    const hpChanges =
        -(
            (
                (monsterSource.stats[monsterStatsEnum.ATK] * power) / // source
                (monsterTarget.stats[monsterStatsEnum.DEF]) // target
            )
        ) *
        (typeEfficiency * isSTAB); // multiplying factor
    monsterTarget.stats[monsterStatsEnum.HP] += hpChanges;

    updateHistory(instance, {
        context: historyContextEnum.DAMAGE,
        content: {
            monster: convertMonsterToHistory(monsterSource), skill: convertSkillToHistory(skill), typeEfficiency: typeEfficiency,
            isSTAB: isSTAB, targetMonster: convertMonsterToHistory(monsterTarget), statName: monsterStatsEnum.HP, statChanges: hpChanges
        }
    })

    return monsterTarget;
};

const _isSTAB = (monsterTypes: monsterType[], skillType: monsterType): number => {
    monsterTypes.forEach((type) => {
        if (type === skillType) {
            return 1.25;
        }
    });
    return 1;
};

const _getTypeAffinities = (type: monsterType) => {
    const affinities = {
        fire: { fire: 1, mental: 1, neutral: 1 },
        mental: { fire: 1, mental: 1, neutral: 2 },
        neutral: { fire: 1, mental: 1, neutral: 0.5 },
    };
    return affinities[type.toString()];
};

const _getTypeEfficiency = (skillType: monsterType, targetTypes: monsterType[]): number => {
    const affinities = _getTypeAffinities(skillType);
    let efficiency = 1;

    targetTypes.forEach((type) => {
        efficiency *= affinities[type];
    });

    return efficiency;
};

const _applyPoison = (instance: instanceInterface, target: actionInterface, power: number) => {
    applyStatus(instance, target, buildStatus(statusName.POISONED, power))
}

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

const deathCheck = (instance: instanceInterface, actionsByTarget: actionInterface): boolean => {
    if (_isNeededToCheckDeath(actionsByTarget)) {
        const monster = getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot]
        if (monster.stats[monsterStatsEnum.HP] <= 0) {
            _kill(instance, actionsByTarget);
            checkEndgame(instance, actionsByTarget.targetInfo.targetedPlayerID);
            return true;
        }
    }

    return false;
};

const _isNeededToCheckDeath = (actionsByTarget: actionInterface): boolean => {
    if (actionsByTarget.targetInfo.targetedPlayerID) return true
    else return false
};

const _kill = (instance: instanceInterface, actionsByTarget: actionInterface) => {
    getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot].stats[monsterStatsEnum.HP] = 0;
    getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot].isAlive = false;

    updateHistory(instance, {
        context: historyContextEnum.KILL,
        content: { monster: convertMonsterToHistory(getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot]) }
    })
};



export {
    effectsType,
    deathCheck,
    doAction,
}