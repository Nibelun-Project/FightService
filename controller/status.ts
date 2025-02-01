import { actionInterface } from "../interfaces/action.js";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { MonsterFightingInterface } from "../interfaces/monster.js";
import { hasEffectAtTheEndOfRound, statusInterface, statusNameType, statusName } from "../interfaces/status.js";
import { deathCheckMonster } from "./death.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";
import { getOnBoardMonsterByID, getPlayerByID } from "./instance.js";

const rollStatus = (instance: instanceInterface, monsterID: string) => {
    let monster = getOnBoardMonsterByID(instance, monsterID)
    if (monster.isAlive === true) {
        monster.statuses.forEach((status) => {

            if (Object.values<statusNameType>(hasEffectAtTheEndOfRound).includes(status.name)) {
                _statusEffects(monster)[status.name]();
            }

            if (status.nbrRound-- === 1) {
                monster.statuses.splice(monster.statuses.indexOf(status), 1);
            }

        })
        deathCheckMonster(instance, monster);
    }
}

const _statusEffects = (monster: MonsterFightingInterface) => {

    const poisoned = () => {
        monster.stats.hp -= monster.starting.hp * 0.05
    }

    return {poisoned};
}

const buildStatus = (name: statusName, nbrRound: number): statusInterface => {
    return {
        name: name,
        nbrRound: nbrRound
    }
}

const applyStatus = (instance: instanceInterface, target: actionInterface, statusToApply: statusInterface) => { 
    const targetMonster = getPlayerByID(target.targetInfo.targetedPlayerID, instance).onBoard[target.targetInfo.spot];
    const sourceMonster = getOnBoardMonsterByID(instance, target.sourceID)

    let nbrRound = 0;
    if (targetMonster.statuses.some((monsterStatus) => { return (monsterStatus.name === statusToApply.name) })) {
        nbrRound = 0;
    } else {
        nbrRound = statusToApply.nbrRound;
        targetMonster.statuses.push(statusToApply);
    }

    updateHistory(instance, {
        context: historyContextEnum.STATUS,
        content: { monster: convertMonsterToHistory(sourceMonster), targetMonster: convertMonsterToHistory(targetMonster), 
            statusName: statusToApply.name, nbrRound: nbrRound }
    })
}

export {
    rollStatus,
    buildStatus,
    applyStatus
}