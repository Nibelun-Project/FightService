import { actionInterface, instanceInterface, playerFightingInterface, targetInfoType } from "../interfaces/fight";
import { historyContextEnum } from "../interfaces/history.js";
import { MonsterFightingInterface, monsterStatsEnum } from "../interfaces/monster.js";
import { updateHistory } from "./history.js";


const getMonsterBySpot = (instance: instanceInterface, spotInfo: targetInfoType): MonsterFightingInterface => {
    return getPlayerByID(spotInfo.targetedPlayerID, instance).onBoard[spotInfo.spot];
};

/**
 *
 * @param {*} spot = to 1 or 0 only
 * @returns change spot 0 to 1, and 1 to 0
 */
const getOtherSpot = (spot: number): number => {
    return (spot + 1) % 2;
};

/**
 *
 * @param {*} instance
 * @param {*} monsterID
 * @returns empty array if no ally on board: []
 */
const getAlly = (instance: instanceInterface, monsterID: string): MonsterFightingInterface => {
    for (let index = 0; index < instance.players.length; index++) {
        const player = instance.players[index];
        if (player.id === getOnBoardMonsterByID(instance, monsterID).playerID) return player.onBoard.find((monster) => monster.id !== monsterID)
    }
};

const getEnnemies = (instance: instanceInterface, monsterID: string): MonsterFightingInterface[] => {
    for (let index = 0; index < instance.players.length; index++) {
        const player = instance.players[index];
        if (player.onBoard.every((monster) => monster.id !== monsterID)) {
            return player.onBoard;
        }
    }
};

const getOnBoardMonsterByID = (instance: instanceInterface, monsterID: string): MonsterFightingInterface => {
    for (let index = 0; index < instance.players.length; index++) {
        const player = instance.players[index];

        if (player.onBoard.some((monster) => monster.id === monsterID)) {
            return player.onBoard.find(monster => monster.id === monsterID)
        }
    }
    return {} as MonsterFightingInterface;
};

const isOnBoard = (instance: instanceInterface, monsterID: string): boolean => {
    for (let index = 0; index < instance.players.length; index++) {
        const player = instance.players[index];
        if (player.team.some((monster) => monster.id === monsterID)) return (player.onBoard.some((monster) => monster.id === monsterID))
    }
    return false
};

/**
 *
 * @param {*} instance
 * @param {*} monsterID
 * @returns -1 for false
 */
const getSpotByMonsterID = (instance: instanceInterface, monsterID: string): number => {
    return getPlayerByID(getOnBoardMonsterByID(instance, monsterID).playerID, instance).onBoard.findIndex((onBoardMonster) => monsterID === onBoardMonster.id);
};

const getActionByMonsterID = (instance: instanceInterface, monsterID: string): actionInterface => {
    for (let index = 0; index < instance.players.length; index++) {
        const player = instance.players[index];

        if (player.actions.some((action) => action.sourceID === monsterID)) {
            return player.actions.find(action => action.sourceID === monsterID)
        }
    }
};

const getPlayerByID = (playerID: string, currInstance: instanceInterface): playerFightingInterface => {
    return currInstance.players.find((player) => player.id === playerID);
}


const isActionsFilled = (currInstance: instanceInterface): boolean => {
    return currInstance.players.every((player) => player.actions.length > 0)
};

const isAvailableToPlayRound = (instance: instanceInterface, monsterID: string): boolean => {
    const monster =getOnBoardMonsterByID(instance, monsterID)
    let isAvailableToPlayRound = true
    if (
        monster.isAlive === false ||
        monster.stats[monsterStatsEnum.HP] <= 0 || // the monster is alive
        !isOnBoard(instance, monsterID)   // the monster is on the board
    ) {
        isAvailableToPlayRound = false
    }

    updateHistory(instance, {
        context: historyContextEnum.PLAYROUND,
        content: { isAvailableToPlayRound: isAvailableToPlayRound, monster: monster, action: getActionByMonsterID(instance, monsterID) }
    })
    
    return isAvailableToPlayRound;
};

export {
    getMonsterBySpot,
    getOtherSpot,
    getAlly,
    getEnnemies,
    getOnBoardMonsterByID,
    isOnBoard,
    getSpotByMonsterID,
    getActionByMonsterID,
    getPlayerByID,
    isActionsFilled,
    isAvailableToPlayRound
}