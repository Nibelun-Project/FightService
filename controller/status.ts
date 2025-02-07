import { actionInterface } from "../interfaces/action.js";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { MonsterFightingInterface } from "../interfaces/monster.js";
import { effectInterface } from "../interfaces/skill.js";
import { hasEffectAtTheEndOfRound, listOfStatus, statusInterface, statusName, statusNameType } from "../interfaces/status.js";
import { deathCheckMonster } from "./death.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";

const _rollStatus = (instance: instanceInterface, monster: MonsterFightingInterface) => {
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

const rollOnboardStatus = (instance: instanceInterface) => {
    instance.players.forEach((player) => {
        player.onBoard.forEach((monster) => {
            _rollStatus(instance, monster)
        })
    })
}

const _statusEffects = (monster: MonsterFightingInterface) => {

    const burned = () => {
        monster.stats.hp -= monster.starting.hp * 0.05
    }

    const poisoned = () => {
        monster.stats.hp -= monster.starting.hp * 0.05
    }

    const regenerated = () => {
        monster.stats.hp += monster.starting.hp * 0.05
        if (monster.stats.hp > monster.starting.hp) monster.stats.hp = monster.starting.hp
    }
    

    return {burned, poisoned, regenerated};
}

const buildStatus = (name: statusNameType, nbrRound: number): statusInterface => {
    return {
        name: name,
        nbrRound: nbrRound
    }
}

const applyStatus = (instance: instanceInterface, monster: MonsterFightingInterface, effect: effectInterface) => { 
    const statusToApply = buildStatus(effect.status, effect.power)

    let nbrRound = 0;
    if (monster.statuses.some((monsterStatus) => { return (monsterStatus.name === statusToApply.name) })) {
        nbrRound = 0;
    } else {
        nbrRound = effect.power;
        monster.statuses.push(statusToApply);
    }

    updateHistory(instance, {
        context: historyContextEnum.STATUS,
        content: { targetMonster: convertMonsterToHistory(monster), 
            statusName: statusToApply.name, nbrRound: nbrRound }
    })
}

const hasStatusFromList = (monster: MonsterFightingInterface, statusList: listOfStatus): boolean => {
    return monster.statuses.some((status) => {
        return Object.values<statusNameType>(statusList).includes(status.name)
    })
}
 const hastStatus = (monster: MonsterFightingInterface, status: statusNameType): boolean => {
    return monster.statuses.some((status) => { status.name === status.name })
 }

export {
    rollOnboardStatus,
    buildStatus,
    applyStatus,
    hasStatusFromList,
    hastStatus
}