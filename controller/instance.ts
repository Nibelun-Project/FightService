import { MonsterFighting, monsterTypeEnum } from "../interfaces/monster.js";
import { statusName } from "../interfaces/status.js";
import { skillCostEnum } from "../interfaces/skill.js";

const getTeam = (playerID): MonsterFighting[] => {
	return [
		new MonsterFighting({
			id: "ronka" + playerID.slice(0, 10),
			name: "ronkarétoal1",
			type: [monsterTypeEnum.FIRE, monsterTypeEnum.MENTAL],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: 100,
				stamina: 120,
				balance: 100,
			},
			image: "../ronk.png",
			passive: {
				trigger: {
					when: "after",
					from: "self",
					type: monsterTypeEnum.MENTAL,
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
					type: monsterTypeEnum.NEUTRAL,
					cost: { type: skillCostEnum.STAMINA, value: 40 },
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
		}),
		new MonsterFighting({
			id: "étoa2" + playerID.slice(0, 10),
			name: "étoalronkaré2",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 100,
				speed: 50, //(parseInt(playerID)/100000)*100,
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
		}),
		new MonsterFighting({
			id: 3 + playerID.slice(0, 10),
			name: "ronkarétoal3",
			type: ["fire", "mental"],
			stats: {
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
		}),
		new MonsterFighting({
			id: 4 + playerID.slice(0, 10),
			name: "ronkarétoal4",
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
		}),
	];
};

export { getTeam };
