import { actionInterface, instanceInterface } from "../interfaces/fight.js";
import { historyContextEnum } from "../interfaces/history.js";
import { MonsterFightingInterface, monsterStatsEnum } from "../interfaces/monster.js";
import { statusInterface, statusName } from "../interfaces/status.js";
import { checkEndgame } from "./action.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";
import { getOnBoardMonsterByID, getPlayerByID } from "./instance.js";

const rollStatus = (instance: instanceInterface, monsterID: string) => {
    let monster = getOnBoardMonsterByID(instance, monsterID)
    if (monster.isAlive === true) {
        monster.statuses.forEach((status) => {
            _statusEffects(monster)[status.name]();
            if (status.nbrRound-- === 1) {
                monster.statuses.splice(monster.statuses.indexOf(status), 1);
            }
        })
        _deathCheck(instance, monster);
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
    const sourceMonster = getPlayerByID(target.sourceID, instance).onBoard[target.targetInfo.spot];

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

const _deathCheck = (instance: instanceInterface, monster: MonsterFightingInterface) => {
    if (monster.stats[monsterStatsEnum.HP] <= 0) {
        _kill(instance, monster);
        checkEndgame(instance, monster.playerID);
    }
    

};

const _kill = (instance: instanceInterface, monster: MonsterFightingInterface) => {

    monster.stats[monsterStatsEnum.HP] = 0;
    monster.isAlive = false;

    updateHistory(instance, {
        context: historyContextEnum.KILL,
        content: { monster: convertMonsterToHistory(monster) }
    })
}


export {
    rollStatus,
    buildStatus,
    applyStatus
}