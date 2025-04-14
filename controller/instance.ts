import { actionInterface, targetInfoType } from "../interfaces/action.js";
import { playerFighting } from "../interfaces/player.js";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
} from "../interfaces/monster.js";
import {
	convertActionToHistory,
	convertMonsterToHistory,
	initFightInfo,
	updateHistory,
} from "./history.js";
import { isSkillHighPriority } from "./skill.js";
import { preventToPlayRound, statusName } from "../interfaces/status.js";
import { hasStatusFromList } from "./status.js";

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
			statuses: [],
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "after",
					from: "self",
					type: "mental",
				},
				effects: [],
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "Cold",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 2,
							status: statusName.COLD,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Poison",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.POISONED,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Regenerated",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.REGENERATED,
						},
					],
					targetType: "ally",
					priority: 100,
				},
				{
					name: "Wait",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [],
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
			statuses: [],
			image: "../etoal.png",
			passive: {
				name: "pâs2",
				description: "okdescript ion",
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ennemies",
					to: "self",
					type: "mental",
				},
				effects: [],
			},
			skills: [
				{
					name: "Cold",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 2,
							status: statusName.COLD,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Poison",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.POISONED,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Regenerated",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.REGENERATED,
						},
					],
					targetType: "ally",
					priority: 100,
				},
				{
					name: "Wait",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [],
					targetType: "ennemies",
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
			statuses: [],
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "self",
					type: "mental",
					to: "self",
				},
				effects: [],
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "Cold",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 2,
							status: statusName.COLD,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Poison",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.POISONED,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Regenerated",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.REGENERATED,
						},
					],
					targetType: "ally",
					priority: 100,
				},
				{
					name: "Wait",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [],
					targetType: "ennemies",
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
			statuses: [],
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "self",
					type: "mental",
					to: "self",
				},
				effects: [],
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "Cold",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 2,
							status: statusName.COLD,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Poison",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.POISONED,
						},
					],
					targetType: "single",
					priority: 100,
				},
				{
					name: "Regenerated",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						{
							targetType: "single",
							type: "status",
							power: 1,
							status: statusName.REGENERATED,
						},
					],
					targetType: "ally",
					priority: 100,
				},
				{
					name: "Wait",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [],
					targetType: "ennemies",
					priority: 100,
				},
			],
			playerID: playerID.toString(),
		},
	];
};

const buildInstance = (matchs: playerFighting[]) => {
	matchs.forEach((match) => {
		match.team = getTeam(match.id);
		match.onBoard = [match.team[0], match.team[1]];
		match.actions = [];
	});
	const fightId = _getNewFightId();
	const instance: instanceInterface = {
		id: fightId,
		players: matchs,
		fightInfo: initFightInfo(),
	};

	return instance;
};

const _getNewFightId = (): string => {
	return "fid_" + Date.now().toString();
};

const clearBoardBeforeRound = (instance: instanceInterface) => {
	instance.players.forEach((player) => {
		player.onBoard = player.onBoard.filter((monster) => _isAlive(monster));
		player.actions = player.actions.filter((action) =>
			_isAlive(player.getOnBoardMonsterByID(action.sourceID)),
		);
	});
};

const checkEndgame = (instance: instanceInterface, playerID: string) => {
	if (
		getPlayerByID(playerID, instance).team.every(
			(monster) => monster.isAlive === false,
		)
	) {
		instance.fightInfo.endgame = true;
		instance.fightInfo.winner = instance.players.find(
			(player) => player.id != playerID,
		).id;

		updateHistory(instance.fightInfo, {
			context: historyContextEnum.ENDGAME,
			content: { winner: instance.fightInfo.winner },
		});
	}
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
const getAlly = (
	instance: instanceInterface,
	monsterID: string,
): MonsterFightingInterface => {
	instance.players.forEach((player) => {
		if (player.onBoard.some((monster) => monster.id === monsterID)) {
			return player.onBoard.find((monster) => monster.id !== monsterID);
		}
	});
	return {} as MonsterFightingInterface;
};

const getEnnemies = (
	instance: instanceInterface,
	monsterID: string,
): MonsterFightingInterface[] => {
	for (let index = 0; index < instance.players.length; index++) {
		const player = instance.players[index];
		if (player.onBoard.every((monster) => monster.id !== monsterID)) {
			return player.onBoard;
		}
	}
};

const isOnBoard = (instance: instanceInterface, monsterID: string): boolean => {
	for (let index = 0; index < instance.players.length; index++) {
		const player = instance.players[index];
		if (player.team.some((monster) => monster.id === monsterID))
			return player.onBoard.some((monster) => monster.id === monsterID);
	}
	return false;
};

/**
 *
 * @param {*} instance
 * @param {*} monsterID
 * @returns -1 for false
 */
const getSpotByMonsterID = (
	instance: instanceInterface,
	monsterID: string,
): number => {
	instance.players.forEach((player) => {
		if (player.onBoard.some((monster) => monster.id === monsterID)) {
			return player.onBoard.findIndex(
				(monster) => monster.id === monsterID,
			);
		}
	});
	return -1;
};

const getActionByMonsterID = (
	instance: instanceInterface,
	monsterID: string,
): actionInterface => {
	for (let index = 0; index < instance.players.length; index++) {
		const player = instance.players[index];

		if (player.actions.some((action) => action.sourceID === monsterID)) {
			return player.actions.find(
				(action) => action.sourceID === monsterID,
			);
		}
	}
};

const getPlayerByID = (
	playerID: string,
	currInstance: instanceInterface,
): playerFighting => {
	return currInstance.players.find((player) => player.id === playerID);
};

const getPlayerByMonsterID = (
	monsterID: string,
	instance: instanceInterface,
) => {
	instance.players.forEach((player) => {
		if (player.team.some((monster) => monster.id === monsterID)) {
			return player;
		}
	});
	return {} as playerFighting;
};

const isActionsFilled = (currInstance: instanceInterface): boolean => {
	return currInstance.players.every((player) => player.actions.length > 0);
};

const isAvailableToPlayRound = (
	instance: instanceInterface,
	monsterID: string,
): boolean => {
	const player = getPlayerByMonsterID(monsterID, instance);
	const monster = player.getOnBoardMonsterByID(monsterID);
	let isAvailableToPlayRound = true;
	if (
		monster.isAlive === false ||
		monster.stats[monsterStatsEnum.HP] <= 0 || // the monster is alive
		!isOnBoard(instance, monsterID) || // the monster is on the board
		(hasStatusFromList(monster, preventToPlayRound) && //TBD
			!isSkillHighPriority(getActionByMonsterID(instance, monsterID)))
	) {
		isAvailableToPlayRound = false;
	}

	updateHistory(instance.fightInfo, {
		context: historyContextEnum.PLAYROUND,
		content: {
			isAvailableToPlayRound: isAvailableToPlayRound,
			monster: convertMonsterToHistory(monster),
			action: convertActionToHistory(
				getActionByMonsterID(instance, monsterID),
			),
		},
	});

	return isAvailableToPlayRound;
};

const applyChanges = (instance: instanceInterface) => {
	instance.players.forEach((player) => {
		player.onBoard.forEach((onBoardMonster) => {
			const teamMonsterIndex = player.team.findIndex(
				(teamMonster) => teamMonster.id === onBoardMonster.id,
			);
			player.team[teamMonsterIndex] = onBoardMonster;
		});
	});
};

const isTargetable = (monster: MonsterFightingInterface): boolean => {
	if (!_isAlive(monster)) {
		return false;
	}
	return true;
};

const _isAlive = (monster: MonsterFightingInterface): boolean => {
	if (monster === undefined || !monster.isAlive) {
		return false;
	}
	return true;
};

export {
	getOtherSpot,
	getAlly,
	getEnnemies,
	isOnBoard,
	getSpotByMonsterID,
	getActionByMonsterID,
	getPlayerByID,
	getPlayerByMonsterID,
	isActionsFilled,
	isAvailableToPlayRound,
	applyChanges,
	buildInstance,
	isTargetable,
	clearBoardBeforeRound,
	checkEndgame,
};
