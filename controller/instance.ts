import { actionInterface, targetInfoType } from "../interfaces/action";
import { playerFightingInterface } from "../interfaces/player";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance";
import { MonsterFightingInterface, monsterStatsEnum } from "../interfaces/monster.js";
import { convertActionToHistory, convertMonsterToHistory, initFightInfo, updateHistory } from "./history.js";
import { isSkillHighPriority } from "./skill";
import { preventToPlayRound } from "../interfaces/status";
import { hasStatusFromList } from "./status";


const getTeam = (playerID): MonsterFightingInterface[] => {
	return [
		{
			id: "ronka" + playerID.slice(0, 10),
			name: "ronkarétoal1",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 100,
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
			statuses:  [
				{name: "asleep", nbrRound: 2},
				{name: "poisoned", nbrRound: 2}
			],
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "after",
					from: "self",
					type: "mental",
				},
				effects: [
					
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
					effects: [{ targetType: "single", type: "damage", power: 200 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Poison",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "poison", power: 2 }],
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
						{ targetType: "ally", type: "damage", power: 200 }
					],
					targetType: "ally",
					priority: 100,
				},
				{
					name: "volcano3",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "ennemies", type: "damage", power: 200 }
					],
					targetType: "ennemies",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
			isAlive: true,
		},
		{
			id: "étoa2" + playerID.slice(0, 10),
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
			statuses:  [

			],
			image: "../etoal.png",
			passive: {
				name: "pâs2",
				description: "okdescript ion",
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ennemies",
					to: "self",
					type: "mental"
				},
				effects: [

				],
			},
			skills: [
				{
					name: "neutralo",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "single", type: "damage", power: 200 }],
					targetType: "single",
					priority: 100,
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [{ targetType: "double", type: "damage", power: 200 }],
					targetType: "double",
					priority: 100,
				},
				{
					name: "pewpew",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "all", type: "damage", power: 200 }
					],
					targetType: "all",
					priority: 100,
				},
				{
					name: "volcano2",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{ targetType: "single", type: "damage", power: 200 }
					],
					targetType: "single",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
		},
		{
			id: 3 + playerID.slice(0, 10),
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
			statuses:  [

			],
			image: "../ronk.png",
			passive: {
				trigger: {
				when: "before",
					actionType: "damage",
					from: "self",
					type: "mental",
					to: "self",
				},
				effects: [

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
						{ targetType: "single", type: "damage", power: 10 }
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
						{ targetType: "single", type: "damage", power: 85 }
					],
					targetType: "single",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
		},
		{
			id: 4 + playerID.slice(0, 10),
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
			statuses:  [

			],
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "self",
					type: "mental",
					to: "self",
				},
				effects: [

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
		match["onBoard"] = [match.team[0], match.team[1]];
		match["actions"] = [];
	});
	const fightId = _getNewFightId();
	const instance: instanceInterface = {
		id: fightId,
		players: matchs,
		fightInfo: initFightInfo(),
	};

	return instance;
}

const _getNewFightId = (): string => {
	return "fid_" + Date.now().toString();
};

const clearBoardBeforeRound = (instance: instanceInterface) => {
	instance.players.forEach((player) => {
		player.onBoard = player.onBoard.filter((monster) => _isAlive(monster))
		player.actions = player.actions.filter((action) => _isAlive(getOnBoardMonsterByID(instance, action.sourceID)) ) 
	})
}

const checkEndgame = (instance: instanceInterface, playerID: string) => {
    if (getPlayerByID(playerID, instance).team.every((monster) => monster.isAlive === false)) {
        instance.fightInfo.endgame = true;
        instance.fightInfo.winner = instance.players.find((player) => player.id != playerID).id

        updateHistory(instance, {
            context: historyContextEnum.ENDGAME,
            content: { winner: instance.fightInfo.winner }
        })
    }
}

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
	const monster = getOnBoardMonsterByID(instance, monsterID)
	let isAvailableToPlayRound = true
	if (
		monster.isAlive === false ||
		monster.stats[monsterStatsEnum.HP] <= 0 || // the monster is alive
		!isOnBoard(instance, monsterID) ||  // the monster is on the board
		(
			hasStatusFromList(monster, preventToPlayRound) &&
			!isSkillHighPriority(getActionByMonsterID(instance, monsterID))
		)
	) {
		isAvailableToPlayRound = false
	}	

	updateHistory(instance, {
		context: historyContextEnum.PLAYROUND,
		content: { isAvailableToPlayRound: isAvailableToPlayRound, monster: convertMonsterToHistory(monster), action: convertActionToHistory(getActionByMonsterID(instance, monsterID)) }
	})
	
	return isAvailableToPlayRound;
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

const isTargetable = (monster: MonsterFightingInterface): boolean => {
	if (!_isAlive(monster)) {
		return false
	}
	return true
}

const _isAlive = (monster: MonsterFightingInterface): boolean => {
	if (monster === undefined || !monster.isAlive) {
		return false
	}
	return true
}

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
	applyChanges,
	buildInstance,
	isTargetable,
	clearBoardBeforeRound,
	checkEndgame
}