import { instanceInterface, playerFightingInterface } from "../interfaces/fight";
import { MonsterFightingInterface } from "../interfaces/monster.js";
import { initFightInfo, initHistoryRound } from "./history.js";
import { speedContest } from "./speedContest.js";
import { clearActions, getPlayerByID, isActionsFilled } from "./instance.js";
import { doAction } from "./action.js";


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

const fight = () => {
	let mapFights: instanceInterface[] = [] as any;

	const ready = (matchs: playerFightingInterface[]): instanceInterface => {
		matchs.forEach((match) => {
			match["team"] = getTeam(match.id);
			match["onBoard"] = [getTeam(match.id)[0], getTeam(match.id)[1]];
			match["actions"] = [];
		});
		const fightId = _getNewFightId();
		const instance: instanceInterface = {
			id: fightId,
			players: matchs,
			fightInfo: initFightInfo(),
		};
		mapFights.push(instance)
		return instance;
	};

	const _getNewFightId = (): string => {
		return "fid_" + Date.now().toString();
	};

	const waitActions = (actions, playerID, fightID) => {
		const currInstance = _getInstanceByID(fightID);
		if (!currInstance) return { status: 3, match: null };
		getPlayerByID(playerID, currInstance).actions = actions;

		if (isActionsFilled(currInstance)) {
			mapFights[fightID] = _playRound(currInstance);
			return {
				status: 2,
				matchInfo: currInstance
			};
		} else
			return {
				status: 1,
				matchInfo: currInstance
			};
	};

	const _getInstanceByID = (fightID: string): instanceInterface => {
		return mapFights.find((instance) => instance.id === fightID);
	};

	const _playRound = (instance: instanceInterface): instanceInterface => {
		initHistoryRound(instance)
		const sortedListOfMonstersID = speedContest(instance);		
		sortedListOfMonstersID.forEach((monsterID) => {
			doAction(instance, monsterID);
		});
		_applyChanges(instance);
		clearActions(instance);
		console.log(instance.fightInfo.round, instance.fightInfo.history);
		return instance;
	};

	const _applyChanges = (instance: instanceInterface) => {
		instance.players.forEach((player) => {
			player.onBoard.forEach((onBoardMonster) => {
				const teamMonsterIndex = player.team.findIndex(
					(teamMonster) => teamMonster.id === onBoardMonster.id
				);
				player.team[teamMonsterIndex] = onBoardMonster;
			});
		})
	};

	return { ready, waitActions };
};

export default fight;

