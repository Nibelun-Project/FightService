import {
	actionInterface,
	effectType,
	instanceInterface,
	playerFightingInterface,
	targetInfoType,
} from "../interfaces/fight";
import { MonsterFightingInterface } from "../interfaces/monster";
import * as history from "./history.js";

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

	const ready = (matchs: playerFightingInterface[]) => {
		matchs.forEach((match) => {
			match["team"] = getTeam(match.id);
			match["onBoard"] = [getTeam(match.id)[0], getTeam(match.id)[1]];
			match["actions"] = [];
		});
		const fightId = _getNewFightId();
		const instance: instanceInterface = {
			id: fightId,
			players: matchs,
			fightInfo: history.initFightInfo(),
		};
		mapFights.push(instance)
		return instance;
	};

	const _getNewFightId = () => {
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

	const _getInstanceByID = (fightID: string) => {
		return mapFights.find((instance) => instance.id === fightID);
	};

	// const _addActionsToInstance = (actions: string) => {
	// 	return mapFights.map((instance) => if(instance.id === fightID));
	// };

	const _isActionsFilled = (currInstance: instanceInterface) => {
		return currInstance.players.every((player) => player.actions.length > 0)
	};

	const _playRound = (instance: instanceInterface) => {
		history.initRound(instance)
		const sortedListOfMonstersID = _speedContest(instance);
		sortedListOfMonstersID.forEach((monsterID) => {
			_doAction(instance, monsterID);
		});
		_applyChanges(instance);
		_clearActions(instance);
		console.log(instance.fightInfo.round, instance.fightInfo.history);
		return instance;
	};

	const _speedContest = (instance: instanceInterface) => {
		let tempMonstersList = [];
		//1 - Prepare array of monster to proceed the speed constest with all needly informations
		tempMonstersList = _prepareMonstersToSpeedContest(instance);

		return _getPlacesOnRound(tempMonstersList, instance);
	};

	/**
	 *
	 * @param {*} instance
	 * @returns [{shuffleID: 1,
	 * 			  monster:   {...},
	 * 			  action:    {...}
	 * 			 },
	 * 			 {...}]
	 */
	const _prepareMonstersToSpeedContest = (instance: instanceInterface) => {
		//1 - set an array with all the monsters on the board
		let tempMonstersList = [];
		instance.players.forEach((player) => {
			tempMonstersList = tempMonstersList.concat(player.onBoard)
		});

		//2 - add for each monster a random id
		tempMonstersList = _shuffleMonsters(tempMonstersList);

		//3 - add for each monster the action he's playing

		tempMonstersList.forEach((customMonster) => {
			customMonster.action = _getActionByMonsterID(
				instance,
				customMonster.monster.id
			).skill;
		});

		return tempMonstersList;
	};

	/**
	 * @param {*} tempMonstersList array of all monsters on the board
	 * @returns array of monster and random id, look like: [{monster, shuffleID}, {...}]
	 */
	const _shuffleMonsters = (tempMonstersList) => {
		//1 - create array of "n°", look like: [1, 2, 3, 4]
		const shuffleIndicators: number[] = [];
		for (let i = 1; i <= tempMonstersList.length; i++) {
			shuffleIndicators.push(i);
		}

		const shuffleArray = (array: number[]) => {
			const _reverseItem = (list, id1, id2) => {
				const temp = list[id1];
				list[id1] = list[id2];
				list[id2] = temp;
			};

			//if the ally on the left get a lower priority switch with the ally
			const _allyPriority = (id1, id2) => {
				if (array[id1] > array[id2]) {
					_reverseItem(array, id1, id2);
				}
			};

			// 3 - for each n° switch it's possition with one other in the list
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				_reverseItem(array, i, j);
			}

			//4 - give the action priority to the ally on the left
			for (let l = 1; l <= array.length - 1; l++) {
				if (tempMonstersList[l - 1].playerID === tempMonstersList[l].playerID)
					_allyPriority(l - 1, l);
			}

			return array;
		};

		//2 - shuffle the list of "n°"
		shuffleArray(shuffleIndicators);
		const monsterListWithShuffleID = [];

		/**
		 * set an array of monster and an id used to randomize the speed contest when to monster get the same speed,
		 * look like: [{monster, contestID}, {...}]
		 */
		for (let index = 0; index < shuffleIndicators.length; index++) {
			monsterListWithShuffleID.push({
				shuffleID: shuffleIndicators[index],
				monster: tempMonstersList[index],
			});
		}
		return monsterListWithShuffleID;
	};

	/**
	 * @param {*} speedContestTempsList array of monster and random id, look like: [{monster, contestID}, {...}]
	 * @returns array of monster in the order they will play there turn.
	 */
	const _getPlacesOnRound = (speedContestTempsList, instance: instanceInterface) => {
		let sortedMonsters = [];
		//1 - For each monster
		speedContestTempsList.forEach((tempMonster) => {
			//2 - Get the number of monster wich will play before, following conditions:
			const count = speedContestTempsList.filter((speedContest) => {
				if (speedContest.action.priority < tempMonster.action.priority || //2.1   - the action have a higher priority

					(tempMonster.action.priority === speedContest.action.priority && //2.2.1 - the action priotity is equal
						speedContest.monster.stats.speed > tempMonster.monster.stats.speed) || //2.2.1 - the speed stat is different

					(tempMonster.action.priority === speedContest.action.priority && //2.3.1 - the action priotity is equal
						speedContest.monster.stats.speed === tempMonster.monster.stats.speed && //2.3.2 - the speed stat is equal,
						_shuffleContest(speedContest, tempMonster, instance)) 			         //2.3.3 - use the a random id to difine priority
				) return true;

				return false;
				/**
				 * return number monsters which validate all conditions and play before "tempMonster",
				 * can't return the same number for two different monster
				 */
			}).length;

			/**
			 * 3 - put the monster at his place:
			 * if there is 3 monsters which is playing before put the monster to the index 3.
			 */
			sortedMonsters[count] = tempMonster.monster.id;
		});
		return sortedMonsters;
	};

	const _shuffleContest = (monster1, monster2, instance: instanceInterface): boolean => {
		history.updateHistory(instance, {
			logOption: "logSpeedContest",
			context: "speedContest",//history.enumContext.SPEEDCONTEST, 
			content: [{ monster: monster1.monster }, { monster: monster2.monster }]
		})
		return monster1.shuffleID < monster2.shuffleID;
	}

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

	const _deathCheck = (instance, actionsByTarget): boolean => {
		//if (_isNeededToCheckDeath(actionsByTarget)) {
		const monster = _getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot]
		if (monster.stats.hp <= 0) {
			console.log("kill from ", actionsByTarget.sourceID, " to ", actionsByTarget.targetInfo);
			_kill(instance, actionsByTarget);
			return true;
		}
		//}

		return false;
	};

	const _isNeededToCheckDeath = (actionsByTarget: actionInterface): boolean => {
		return (!actionsByTarget.targetInfo.targetedPlayerID == undefined);
	};

	const _kill = (instance, actionsByTarget) => {
		_getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot].stats.hp = 0;
		_getPlayerByID(actionsByTarget.targetInfo.targetedPlayerID, instance).onBoard[actionsByTarget.targetInfo.spot].isAlive = false;

		history.updateHistory(instance, {
			logOption: "logInfo",
			context: "kill",//history.enumContext.PLAYROUND, 
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
			monster.stats.hp <= 0 || // the monster is alive
			!_isOnBoard(instance, monsterID)   // the monster is on the board
		) {
			isAvailableToPlayRound = false
		}
		history.updateHistory(instance, {
			logOption: "logInfo",
			context: "playRound",//history.enumContext.PLAYROUND, 
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

		history.updateHistory(instance, {
			logOption: "logInfo",
			context: "swap",//history.enumContext.SPEEDCONTEST, 
			content: { monster: sourceMonster, targetMonster: player.team[teamTargetMonsterIndex] }
		});
	};

	const _doCalculDamage = (instance: instanceInterface, target: actionInterface, power) => {
		const skill = target.skill;
		const monsterSource = _getOnBoardMonsterByID(instance, target.sourceID);
		const monsterTarget = _getPlayerByID(target.targetInfo.targetedPlayerID, instance).onBoard[target.targetInfo.spot];
		const typeEfficiency = _getTypeEfficiency(skill.type, monsterTarget.type);
		const isSTAB = _isSTAB(monsterSource.type, skill.type);

		const hpChanges =
			-(
				(
					(monsterSource.stats.attack * power) / // source
					(monsterTarget.stats.def) // target
				)
			) *
			(typeEfficiency * isSTAB); // multiplying factor
		monsterTarget.stats.hp += hpChanges;

		history.updateHistory(instance, {
			logOption: "logInfo",
			context: "damage",//history.enumContext.SPEEDCONTEST, 
			content: {
				monster: monsterSource, skill: skill, typeEfficiency: typeEfficiency,
				isSTAB: isSTAB, targetMonster: monsterTarget, statName: "HP", statChanges: hpChanges
			}
		})

		return monsterTarget;
	};

	const _isSTAB = (monsterTypes, skillType) => {
		monsterTypes.forEach((type) => {
			if (type === skillType) {
				return 1.25;
			}
		});
		return 1;
	};

	const _getTypeAffinities = (type) => {
		const affinities = {
			fire: { fire: 1, mental: 1, neutral: 1 },
			mental: { fire: 1, mental: 1, neutral: 2 },
			neutral: { fire: 1, mental: 1, neutral: 0.5 },
		};
		return affinities[type.toString()];
	};

	const _getTypeEfficiency = (skillType, targetTypes) => {
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

	const _getActionByMonsterID = (instance: instanceInterface, monsterID): actionInterface => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];

			if (player.actions.some((action) => action.sourceID === monsterID)) {
				return player.actions.find(action => action.sourceID === monsterID)
			}
		}
	};

	const _getTargeting = (
		instance: instanceInterface,
		actionFromMonster: actionInterface,
		effectTargetType: string
	) => {
		const self = () => {
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

		const ally = () => {
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

		const allies = () => {
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

		const ennemies = () => {
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

		const single = () => {
			let target = _getMonsterBySpot(instance, actionFromMonster.targetInfo);

			if (target === undefined || !target.isAlive) {
				// if spot is empty
				actionFromMonster.targetInfo.spot = _getOtherSpot(
					actionFromMonster.targetInfo.spot
				); // get the other spot
				target = _getMonsterBySpot(instance, actionFromMonster.targetInfo);
				if (target === undefined || !target.isAlive) return { targets: [] }; // if empty too return []

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

		const singleBackstage = () => {
			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: actionFromMonster.targetInfo,
					skill: actionFromMonster.skill,
				},
			];
		};

		const double = () => {
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

		const all = () => {
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

	const _getMonsterBySpot = (instance: instanceInterface, spotInfo: targetInfoType) => {
		return _getPlayerByID(spotInfo.targetedPlayerID, instance).onBoard[spotInfo.spot];
	};

	/**
	 *
	 * @param {*} spot = to 1 or 0 only
	 * @returns change spot 0 to 1, and 1 to 0
	 */
	const _getOtherSpot = (spot) => {
		return (spot + 1) % 2;
	};

	/**
	 *
	 * @param {*} instance
	 * @param {*} monsterID
	 * @returns empty array if no ally on board: []
	 */
	const _getAlly = (instance: instanceInterface, monsterID: string) => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];
			if (player.id === _getOnBoardMonsterByID(instance, monsterID).playerID) return player.onBoard.find((monster) => monster.id !== monsterID)
		}
	};

	const _getEnnemies = (instance: instanceInterface, monsterID: string) => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];
			if (player.onBoard.every((monster) => monster.id !== monsterID)) {
				return player.onBoard;
			}
		}
	};

	const _getOnBoardMonsterByID = (instance: instanceInterface, monsterID: string) => {
		for (let index = 0; index < instance.players.length; index++) {
			const player = instance.players[index];

			if (player.onBoard.some((monster) => monster.id === monsterID)) {
				return player.onBoard.find(monster => monster.id === monsterID)
			}
		}
		return {} as MonsterFightingInterface;
	};

	const _isOnBoard = (instance: instanceInterface, monsterID) => {
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
	const _getSpotByMonsterID = (instance: instanceInterface, monsterID: string) => {

		return _getPlayerByID(_getOnBoardMonsterByID(instance, monsterID).playerID, instance).onBoard.findIndex((onBoardMonster) => monsterID === onBoardMonster.id);
	};

	return { ready, waitActions };
};

export default fight;
