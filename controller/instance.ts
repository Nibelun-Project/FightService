import { playerFighting } from "../interfaces/player.js";
import { Instance } from "../interfaces/instance.js";
import { MonsterFightingInterface } from "../interfaces/monster.js";
import { initFightInfo } from "./history.js";
import { statusName } from "../interfaces/status.js";

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
	const instance: Instance = new Instance(fightId, matchs, initFightInfo());
	return instance;
};

const _getNewFightId = (): string => {
	return "fid_" + Date.now().toString();
};

/**
 *
 * @param {*} spot = to 1 or 0 only
 * @returns change spot 0 to 1, and 1 to 0
 */
const getOtherSpot = (spot: number): number => {
	return (spot + 1) % 2;
};

const isTargetable = (monster: MonsterFightingInterface): boolean => {
	if (!isAlive(monster)) {
		return false;
	}
	return true;
};

const isAlive = (monster: MonsterFightingInterface): boolean => {
	if (monster === undefined || !monster.isAlive) {
		return false;
	}
	return true;
};

export { getOtherSpot, buildInstance, isTargetable, isAlive };
