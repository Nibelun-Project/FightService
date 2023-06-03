import { actionInterface, instanceInterface, playerFightingInterface, targetInfoType } from "../interfaces/fight";
import { historyContextEnum } from "../interfaces/history.js";
import { MonsterFightingInterface, monsterStatsEnum } from "../interfaces/monster.js";
import { initFightInfo, updateHistory } from "./history.js";


const getTeam = (playerID): MonsterFightingInterface[] => {
	return [
		{
			id: 1 + playerID,
			name: "ronkarétoal1",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 50,
				stamina: 120,
				balance: 100,
			},
			starting: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 50,
				stamina: 120,
				balance: 100,
			},
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "after",
					from: "self",
					type: "fire",
				},
				effects: [
					{
						targetType: "single",
						side: "to",
						type: "damage",
						power: 10000000,
					},
				],
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "neutralo",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "double", type: "damage", power: 45 }],
					targetType: "double",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "pewpew",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "single", type: "damage", power: 10 },
						{ targetType: "single", type: "damage", power: 10 },
						{ targetType: "single", type: "damage", power: 10 },
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "self", type: "damage", power: 15 },
						{ targetType: "single", type: "damage", power: 85 },
					],
					targetType: "single",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
			isAlive: true,
		},
		{
			id: 2 + playerID,
			name: "étoalronkaré2",
			isAlive: true,
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 100,
				speed: 50, //(parseInt(playerID)/100000)*100,
				stamina: 100,
				balance: 100,
			},
			starting: {
				hp: 300,
				attack: 100,
				def: 100,
				speed: 50,
				stamina: 100,
				balance: 100,
			},
			image: "../etoal.png",
			passive: {
				name: "pâs2",
				description: "okdescript ion",
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ennemies",
					to: "ally",
				},
				effects: [
					{
						targetType: "single",
						side: "from",
						type: "damage",
						power: 1000,
					},
				],
			},
			skills: [
				{
					name: "neutralo",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "double", type: "damage", power: 45 }, { targetType: "ally", type: "damage", power: 15 }],
					targetType: "double",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "pewpew",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "single", type: "damage", power: 10 },
						{ targetType: "single", type: "damage", power: 10 },
						{ targetType: "single", type: "damage", power: 10 },
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "self", type: "damage", power: 15 },
						{ targetType: "single", type: "damage", power: 85 },
					],
					targetType: "single",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
		},
		{
			id: 3 + playerID,
			name: "ronkarétoal3",
			isAlive: true,
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 50,
				// precision: 100,
				// statusRes: 100,
				stamina: 120,
				balance: 100,
			},
			starting: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 50,
				stamina: 120,
				balance: 100,
			},
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ally",
					type: "neutral",
					to: "ally",
				},
				effects: [
					{
						targetType: "single",
						side: "to",
						type: "damage",
						power: 15,
					},
				],
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "neutralo",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "double", type: "damage", power: 45 }],
					targetType: "double",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "pewpew",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "single", type: "damage", power: 10 },
						{ targetType: "single", type: "damage", power: 10 },
						{ targetType: "single", type: "damage", power: 10 },
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "self", type: "damage", power: 15 },
						{ targetType: "single", type: "damage", power: 85 },
					],
					targetType: "single",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
		},
		{
			id: 4 + playerID,
			name: "ronkarétoal4",
			isAlive: true,
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 50,
				// precision: 100,
				// statusRes: 100,
				stamina: 120,
				balance: 100,
			},
			starting: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 50,
				stamina: 120,
				balance: 100,
			},
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ally",
					type: "neutral",
					to: "ally",
				},
				effects: [
					{
						targetType: "single",
						side: "to",
						type: "damage",
						power: 15,
					},
				],
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 45 }],
					targetType: "single",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
		},
	];
};

const buildInstance = (matchs: playerFightingInterface[]) => {
    matchs.forEach((match) => {
        match["team"] = getTeam(match.id);
        match["onBoard"] = [getTeam(match.id)[0], getTeam(match.id)[1]];
        match["actions"] = [];
    });
    const fightId = getNewFightId();
    const instance: instanceInterface = {
        id: fightId,
        players: matchs,
        fightInfo: initFightInfo(),
    };

    return instance;
}

const getNewFightId = (): string => {
    return "fid_" + Date.now().toString();
};

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

const clearActions = (instance: instanceInterface) => {
    instance.players.forEach((player) => {
        player.actions = []
    })
};

const applyChanges = (instance: instanceInterface) => {
    instance.players.forEach((player) => {
        player.onBoard.forEach((onBoardMonster) => {
            const teamMonsterIndex = player.team.findIndex(
                (teamMonster) => teamMonster.id === onBoardMonster.id
            );
            player.team[teamMonsterIndex] = onBoardMonster;
        });
    })
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
    isAvailableToPlayRound,
    clearActions,
    applyChanges,
    getNewFightId,
    buildInstance
}