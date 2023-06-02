import {
	actionInterface,
	effectType,
	instanceInterface,
	playerFightingInterface,
	targetInfoType,
} from "../interfaces/fight";
import { MonsterFightingInterface, MonsterSpeedInterface, monsterStatsEnum, monsterType } from "../interfaces/monster.js";
import { initFightInfo, initHistoryRound, updateHistory } from "./history.js";

import { historyContextEnum } from "../interfaces/history.js"
import { speedContest } from "./speedContest.js";


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
		_getPlayerByID(playerID, currInstance).actions = actions;

		if (_isActionsFilled(currInstance)) {
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

	const _getPlayerByID = (playerID: string, currInstance: instanceInterface): playerFightingInterface => {
		return currInstance.players.find((player) => player.id === playerID);
	};

	const _getInstanceByID = (fightID: string): instanceInterface => {
		return mapFights.find((instance) => instance.id === fightID);
	};

	const _isActionsFilled = (currInstance: instanceInterface): boolean => {
		return currInstance.players.every((player) => player.actions.length > 0)
	};

	const _playRound = (instance: instanceInterface): instanceInterface => {
		initHistoryRound(instance)
		const sortedListOfMonstersID = speedContest(instance);		
		sortedListOfMonstersID.forEach((monsterID) => {
			_doAction(instance, monsterID);
		});
		_applyChanges(instance);
		_clearActions(instance);
		console.log(instance.fightInfo.round, instance.fightInfo.history);
		return instance;
	};

	const effectsType = () => {
		const damage = (instance: instanceInterface, actionsByTarget: actionInterface, power: number) => {
			console.log(
				"damage from ",
				actionsByTarget.sourceID,
				" to ",
				actionsByTarget.targetInfo
			);
			_doCalculDamage(instance, actionsByTarget, power);
		};

		const balance = (instance, actionsByTarget, power) => {
			console.log(
				"balance from ",
				actionsByTarget.sourceID,
				" to ",
				actionsByTarget.targetInfo
			);
		};

		const heal = (instance, actionsByTarget, power) => {
			console.log(
				"heal from ",
				actionsByTarget.sourceID,
				" to ",
				actionsByTarget.targetInfo
			);
		};

		const swap = (instance, actionsByTarget) => {
			console.log(
				"swap on",
				actionsByTarget.sourceID,
				" with ",
				actionsByTarget.targetInfo
			);
			_swapOnBoard(instance, actionsByTarget);
		};

		return { damage, balance, heal, swap };
	};

	const _doAction = (instance: instanceInterface, monsterID: string) => {
		if (_isAvailableToPlayRound(instance, monsterID)) {
			const actionFromMonster = _getActionByMonsterID(instance, monsterID);

			//Loop through skill effects			
			actionFromMonster.skill.effects.forEach((effect) => {
				const effectTargets = _getTargeting(instance, actionFromMonster, effect.targetType);
				effectTargets.forEach((target) => {
					passif(effectsType()[effect.type], target, effect.power, effect.type, instance)
					return !_deathCheck(instance, target);
				})

			});
		}
	};

	const _deathCheck = (instance: instanceInterface, actionsByTarget: actionInterface): boolean => {
		if (_isNeededToCheckDeath(actionsByTarget)) {
			const monster = _getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot]
			if (monster.stats[monsterStatsEnum.HP] <= 0) {
				_kill(instance, actionsByTarget);
				return true;
			}
		}

		return false;
	};

	const _isNeededToCheckDeath = (actionsByTarget: actionInterface): boolean => {
		if (actionsByTarget.targetInfo.targetedPlayerID) return true
        else return false
	};

	const _kill = (instance: instanceInterface, actionsByTarget: actionInterface) => {
		_getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot].stats[monsterStatsEnum.HP] = 0;
		_getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot].isAlive = false;

		updateHistory(instance, {
			context: historyContextEnum.KILL,
			content: { monster: _getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot] }
		})
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

	const passif = (
		action,
		target,
		power: number,
		actionType: effectType,
		instance: instanceInterface
	) => {
		const ennemies = (owner: MonsterFightingInterface) => {
			return _getEnnemies(instance, owner.id);
		};
		const ally = (owner: MonsterFightingInterface) => {
			return [_getAlly(instance, owner.id)]
		};
		const allies = (owner: MonsterFightingInterface) => {
			return [_getPlayerByID(owner.playerID, instance).onBoard];
		};
		const self = (owner: MonsterFightingInterface) => {
			return [owner];
		};

		const fromType = { ennemies, ally, allies, self };

		const checkPassif = (from, to, owner: MonsterFightingInterface) => {
			if (owner.passive.trigger.actionType && owner.passive.trigger.actionType !== actionType) return false;
			const ownerFrom = fromType[owner.passive.trigger.from](owner);
			if (!ownerFrom.find((monster: MonsterFightingInterface) => {
				return monster.id === from.id
			})) return false;
			if (owner.passive.trigger.to && !fromType[owner.passive.trigger.to](owner).find((monster: MonsterFightingInterface) => {
				return monster.id === _getMonsterBySpot(instance, to).id
			})) return false;

			if (owner.passive.trigger.type && owner.passive.trigger.type !== target.skill.type) return false;
			if (owner.passive.trigger.targetType && owner.passive.trigger.targetType !== target.skill.targetType) return false;

			return true;
		};

		const applyEffects = (owner: MonsterFightingInterface, from, to) => {
			owner.passive.effects.forEach((effect) => {
				const effectTargets = _getTargeting(instance, {
					sourceID: owner.id,
					targetInfo:
						effect.side === "from"
							? {
								targetedPlayerID: _getOnBoardMonsterByID(instance, from.id)
									.playerID,
								spot: _getSpotByMonsterID(instance, from.id),
							}
							: to,
					skill: {
						targetType: effect.targetType,
						name: owner.passive.name,
						description: owner.passive.description,
						type: "neutral",
						cost: { type: "stamina", value: 0 },
						effects: {} as any,
						priority: 0
					},
				}, effect.targetType);

				if (effectTargets <= 0) return false;
				effectTargets.forEach((target) => {
					effectsType()[effect.type](
						instance,
						target,
						effect.power
					);
				});
			});
		};

		const before = (from, to, owner) => {
			if (!checkPassif(from, to, owner)) return false;
			console.log("before triggered by :" + owner.name);
			applyEffects(owner, from, to);

			return true;
		};

		const prevent = (from, to, owner) => {
			console.log("try to prevent :" + owner.name);
			if (!checkPassif(from, to, owner)) return false;
			applyEffects(owner, from, to);

			console.log("prevent triggered by :" + owner.name);
			return true;
		};

		const after = (from, to, owner) => {
			if (!checkPassif(from, to, owner)) return false;
			console.log("after triggered by :" + owner.name);
			applyEffects(owner, from, to);

			return true;
		};

		const eventWhen = { before, after, prevent };

		let passifBefore = [];
		let passifPrevent = [];
		let passifAfter = [];

		instance.players.forEach((player) => {
			player.onBoard.forEach((monster) => {
				switch (monster.passive.trigger.when) {
					case "before":
						passifBefore.push(monster);
						break;
					case "prevent":
						passifPrevent.push(monster);
						break;
					case "after":
						passifAfter.push(monster);
						break;
				}
			});
		})

		const loopThroughPassif = (whenArray) => {
			if (whenArray.length <= 0) return false;
			let prevented = false;
			for (let i = 0; i < whenArray.length; i++) {
				const monster = whenArray[i];
				if (
					eventWhen[monster.passive.trigger.when](
						_getOnBoardMonsterByID(instance, target.sourceID),
						target.targetInfo,
						monster
					) &&
					monster.passive.when === "prevent"
				)
					prevented = true;
			}
			return prevented;
		};
		loopThroughPassif(passifBefore);
		if (!loopThroughPassif(passifPrevent)) action(instance, target, power);
		loopThroughPassif(passifAfter);
	};

	const _isAvailableToPlayRound = (instance: instanceInterface, monsterID: string): boolean => {
		const monster = _getOnBoardMonsterByID(instance, monsterID)
		let isAvailableToPlayRound = true
		if (
			monster.isAlive === false ||
			monster.stats[monsterStatsEnum.HP] <= 0 || // the monster is alive
			!_isOnBoard(instance, monsterID)   // the monster is on the board
		) {
			isAvailableToPlayRound = false
		}

		updateHistory(instance, {
			context: historyContextEnum.PLAYROUND,
			content: { isAvailableToPlayRound: isAvailableToPlayRound, monster: monster, action: _getActionByMonsterID(instance, monsterID) }
		})
		
		return isAvailableToPlayRound;
	};

	const _swapOnBoard = (instance: instanceInterface, actionsByTarget: actionInterface) => {
		const sourceMonster = _getOnBoardMonsterByID(instance, actionsByTarget.sourceID);
		const player = _getPlayerByID(sourceMonster.playerID, instance)
		const teamSourceMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === actionsByTarget.sourceID);
		player.team[teamSourceMonsterIndex] = sourceMonster;

		const teamTargetMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === actionsByTarget.targetInfo.id);
		const onBoardSourceMonsterIndex = player.onBoard.findIndex((onBoardMonster) => onBoardMonster.id === actionsByTarget.sourceID);
		player.onBoard[onBoardSourceMonsterIndex] = player.team[teamTargetMonsterIndex];

		updateHistory(instance, {
			context: historyContextEnum.SWAP,
			content: { monster: sourceMonster, targetMonster: player.team[teamTargetMonsterIndex] }
		});
	};

	const _doCalculDamage = (instance: instanceInterface, target: actionInterface, power: number): MonsterFightingInterface => {
		const skill 		 = target.skill;
		const monsterSource  = _getOnBoardMonsterByID(instance, target.sourceID);
		const monsterTarget  = _getPlayerByID(target.targetInfo.targetedPlayerID, instance).onBoard[target.targetInfo.spot];
		const typeEfficiency = _getTypeEfficiency(skill.type, monsterTarget.type);
		const isSTAB 		 = _isSTAB(monsterSource.type, skill.type);

		const hpChanges =
			-(
				(
					(monsterSource.stats[monsterStatsEnum.ATK] * power) / // source
					(monsterTarget.stats[monsterStatsEnum.DEF]) // target
				)
			) *
			(typeEfficiency * isSTAB); // multiplying factor
		monsterTarget.stats[monsterStatsEnum.HP] += hpChanges;

		updateHistory(instance, {
			context: historyContextEnum.DAMAGE,
			content: {monster: monsterSource, skill: skill, typeEfficiency: typeEfficiency,
					  isSTAB: isSTAB, targetMonster: monsterTarget, statName: monsterStatsEnum.HP, statChanges: hpChanges}})
					  
		return monsterTarget;
	};

	const _isSTAB = (monsterTypes: monsterType[], skillType: monsterType): number => {
		monsterTypes.forEach((type) => {
			if (type === skillType) {
				return 1.25;
			}
		});
		return 1;
	};

	const _getTypeAffinities = (type: monsterType) => {
		const affinities = {
			fire: { fire: 1, mental: 1, neutral: 1 },
			mental: { fire: 1, mental: 1, neutral: 2 },
			neutral: { fire: 1, mental: 1, neutral: 0.5 },
		};
		return affinities[type.toString()];
	};

	const _getTypeEfficiency = (skillType: monsterType, targetTypes: monsterType[]): number => {
		const affinities = _getTypeAffinities(skillType);
		let efficiency = 1;

		targetTypes.forEach((type) => {
			efficiency *= affinities[type];
		});

		return efficiency;
	};

	const _clearActions = (instance: instanceInterface) => {
		instance.players.forEach((player) => {
			player.actions = []
		})
	};

	const _getActionByMonsterID = (instance: instanceInterface, monsterID: string): actionInterface => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];

			if (player.actions.some((action) => action.sourceID === monsterID)) {
				return player.actions.find(action => action.sourceID === monsterID)
			}
		}
	};

	const _getTargeting = (instance: instanceInterface, actionFromMonster: actionInterface, effectTargetType: string) => {
		const self = (): actionInterface[] => {
			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: _getOnBoardMonsterByID(
							instance,
							actionFromMonster.sourceID
						).playerID,
						spot: _getSpotByMonsterID(instance, actionFromMonster.sourceID),
					},
					skill: actionFromMonster.skill,
				}
			]


		};

		const ally = (): actionInterface[] => {
			const ally = _getAlly(instance, actionFromMonster.sourceID);

			if (ally === undefined) return [];
			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: ally.playerID,
						spot: actionFromMonster.targetInfo.spot,
					},
					skill: actionFromMonster.skill,
				},
			]

		};

		const allies = (): actionInterface[] => {
			const effectListByTarget = [];
			const sourceMonster = _getOnBoardMonsterByID(
				instance,
				actionFromMonster.sourceID
			);

			_getPlayerByID(sourceMonster.playerID, instance).onBoard.forEach((monster) => {
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: sourceMonster.playerID,
						spot: _getSpotByMonsterID(instance, monster.id),
					},
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const ennemies = (): actionInterface[] => {
			const effectListByTarget = []
			const targetsList = _getEnnemies(instance, actionFromMonster.sourceID);

			targetsList.forEach((monster) => {
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: monster.playerID,
						spot: _getSpotByMonsterID(instance, monster.id),
					},
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const single = (): actionInterface[] => {
			let target = _getMonsterBySpot(instance, actionFromMonster.targetInfo);

			if (target === undefined || !target.isAlive) {
				// if spot is empty
				actionFromMonster.targetInfo.spot = _getOtherSpot(
					actionFromMonster.targetInfo.spot
				); // get the other spot
				target = _getMonsterBySpot(instance, actionFromMonster.targetInfo);
				if (target === undefined || !target.isAlive) return []; // if empty too return []

				return [
					{
						sourceID: actionFromMonster.sourceID,
						targetInfo: {
							targetedPlayerID: target.playerID,
							spot: actionFromMonster.targetInfo.spot,
						},
						skill: actionFromMonster.skill,
					},
				]
			}

			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: actionFromMonster.targetInfo,
					skill: actionFromMonster.skill,
				},
			]
		};

		const singleBackstage = (): actionInterface[] => {
			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: actionFromMonster.targetInfo,
					skill: actionFromMonster.skill,
				},
			];
		};

		const double = (): actionInterface[] => {
			const effectListByTarget = []
			_getPlayerByID(actionFromMonster.targetInfo.targetedPlayerID, instance).onBoard.forEach(
				(monster) => {
					effectListByTarget.push({
						sourceID: actionFromMonster.sourceID,
						targetInfo: {
							targetedPlayerID: monster.playerID,
							spot: _getSpotByMonsterID(instance, monster.id),
						},
						skill: actionFromMonster.skill,
					});
				}
			);

			return effectListByTarget;
		};

		const all = (): actionInterface[] => {
			const effectListByTarget = []
			let targetsList = [];

			for (let index = 0; index < instance.players.length; index++) {
				const player = instance.players[index];
				targetsList = targetsList.concat(player.onBoard)
			}

			targetsList.forEach((monster) => {
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: monster.playerID,
						spot: _getSpotByMonsterID(instance, monster.id),
					},
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const TargetTypes = {
			self,
			ally,
			allies,
			ennemies,
			single,
			singleBackstage,
			double,
			all,
		};
		return TargetTypes[effectTargetType]();
	};

	const _getMonsterBySpot = (instance: instanceInterface, spotInfo: targetInfoType): MonsterFightingInterface => {
		return _getPlayerByID(spotInfo.targetedPlayerID, instance).onBoard[spotInfo.spot];
	};

	/**
	 *
	 * @param {*} spot = to 1 or 0 only
	 * @returns change spot 0 to 1, and 1 to 0
	 */
	const _getOtherSpot = (spot: number): number => {
		return (spot + 1) % 2;
	};

	/**
	 *
	 * @param {*} instance
	 * @param {*} monsterID
	 * @returns empty array if no ally on board: []
	 */
	const _getAlly = (instance: instanceInterface, monsterID: string): MonsterFightingInterface => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];
			if (player.id === _getOnBoardMonsterByID(instance, monsterID).playerID) return player.onBoard.find((monster) => monster.id !== monsterID)
		}
	};

	const _getEnnemies = (instance: instanceInterface, monsterID: string): MonsterFightingInterface[] => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];
			if (player.onBoard.every((monster) => monster.id !== monsterID)) {
				return player.onBoard;
			}
		}
	};

	const _getOnBoardMonsterByID = (instance: instanceInterface, monsterID: string): MonsterFightingInterface => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];

			if (player.onBoard.some((monster) => monster.id === monsterID)) {
				return player.onBoard.find(monster => monster.id === monsterID)
			}
		}
		return {} as MonsterFightingInterface;
	};

	const _isOnBoard = (instance: instanceInterface, monsterID: string): boolean => {
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
	const _getSpotByMonsterID = (instance: instanceInterface, monsterID: string): number => {
		return _getPlayerByID(_getOnBoardMonsterByID(instance, monsterID).playerID, instance).onBoard.findIndex((onBoardMonster) => monsterID === onBoardMonster.id);
	};

	return { ready, waitActions };


};

export default fight;


