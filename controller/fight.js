const getTeam = (playerID) => {
	const idP = (indice) => {
		console.log(playerID);
		return (parseInt(playerID) * indice).toString();
	};
	return [
		{
			id: 1+playerID,
			name: "ronkarétoal1",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: (parseInt(playerID) / 100000) * 50,
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
			passif: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ally",
					type: "neutral",
					to: "ally",
				},
				event: {
					target: "single",
					effects: [
						[
							{ type: "damage", power: "15" }, //same effects to all targets
						],
					],
				},
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "brasero",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" }
						],
					],
					target: "single",
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" }
						],
					],
					target: "double",
				},
				{
					name: "howling",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "balance", value: 25 },
					effects: [
						[
							{ type: "damage", power: "45" }
						]
					],
					target: "self",
				},
				{
					name: "cup of tea",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "hp", value: 10 },
					effects: [
						[
							{ type: "damage", power: "45" }
							
						],
					],
					target: "ally",
				},
			],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		},
		{
			id: 2+playerID,
			name: "étoalronkaré2",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 100,
				speed: 100, //(parseInt(playerID)/100000)*100,
				// precision: 100,
				// statusRes: 100,
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
			passif: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ally",
					to: "allies",
					type: "fire",
					target: "double",
				},
				event: {
					target: "single",
					effects: [
						[
							{ type: "heal", power: "15" }
						],
					],
				},
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "telluric force",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" }
						],
					],
					target: "single",
				},
				{
					name: "spirit touch",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" },
						],
					],
					target: "ennemies",
				},
				{
					name: "destiny wings",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "mental",
					cost: { type: "balance", value: 25 },
					effects: [
						[
							{ type: "damage", power: "45" }
						]
					],
					target: "all",
				},
				{
					name: "grass cut",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ...",
					type: "neutral",
					cost: { type: "hp", value: 10 },
					effects: [
						[
							{ type: "damage", power: "45" }
						],
					],
					target: "allies",
				},
			],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		},
		{
			id: 3+playerID,
			name: "ronkarétoal3",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: (parseInt(playerID) / 100000) * 50,
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
			passif: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ally",
					type: "neutral",
					to: "ally",
				},
				event: {
					target: "single",
					effects: [
						[
							{ type: "damage", power: "15" }, //same effects to all targets
						],
					],
				},
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "brasero",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" },
						],
					],
					target: "single",
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" },
						],
					],
					target: "single",
				},
				{
					name: "howling",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "balance", value: 25 },
					effects: [
						[
							{ type: "damage", power: "45" },
						]
					],
					target: "single",
				},
				{
					name: "cup of tea",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "hp", value: 10 },
					effects: [
						[
							{ type: "damage", power: "45" }, //same effects to all targets
							
						],
					],
					target: "single",
				},
			],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		},
		{
			id: 4+playerID,
			name: "ronkarétoal4",
			type: ["fire", "mental"],
			stats: {
				hp: 300,
				attack: 100,
				def: 80,
				speed: (parseInt(playerID) / 100000) * 50,
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
			passif: {
				trigger: {
					when: "before",
					actionType: "damage",
					from: "ally",
					type: "neutral",
					to: "ally",
				},
				event: {
					target: "single",
					effects: [
						[
							{ type: "damage", power: "15" }, //same effects to all targets
						],
					],
				},
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [
				{
					name: "brasero",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "fire",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" },
						],
					],
					target: "single",
				},
				{
					name: "volcano",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "stamina", value: 40 },
					effects: [
						[
							{ type: "damage", power: "45" },
						],
					],
					target: "single",
				},
				{
					name: "howling",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "balance", value: 25 },
					effects: [
						[
							{ type: "damage", power: "45" },
						]
					],
					target: "single",
				},
				{
					name: "cup of tea",
					description:
						"text sample.lorem ipsum dqsjdk jdqskdqs jqsdk .text sample.lorem ipsum dqsjdk jdqskdqs jqsdk ..",
					type: "neutral",
					cost: { type: "hp", value: 10 },
					effects: [
						[
							{ type: "damage", power: "45" }, //same effects to all targets
							
						],
					],
					target: "single",
				},
			],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		}
	];
};

const fight = () => {
	let mapFights = {};

	const ready = (match) => {
		for (const [key, value] of Object.entries(match)) {
			value["team"] = getTeam(key);
			value["onBoard"] = [getTeam(key)[0], getTeam(key)[1]]
			value["actions"] = [];
		}
		return _startCombat(match);
	};

	const _getNewFightId = () => {
		return "fid_" + Date.now().toString();
	};

	const _startCombat = (match) => {
		const fightId = _getNewFightId();
		mapFights[fightId.toString()] = match;
		return [match, fightId];
	};

	const waitActions = (actions, playerID, fightID) => {
		if (!mapFights[fightID]) return { status: 3, match: null };
		mapFights[fightID][playerID].actions = actions;
		if (_isActionsFilled(mapFights[fightID])) {
			mapFights[fightID] = _playRound(mapFights[fightID]);
			return {
				status: 2,
				matchInfo: { fightID: fightID, match: mapFights[fightID] },
			};
		} else
			return {
				status: 1,
				matchInfo: { fightID: fightID, match: mapFights[fightID] },
			};
	};

	const _isActionsFilled = (tempInstance) => {
		for (const [key, value] of Object.entries(tempInstance)) {
			if (value.actions.length === 0) return false;
		}
		return true;
	};

	const _playRound = (instance) => {
		const sortedListOfMonstersID = _speedContest(instance);
		sortedListOfMonstersID.forEach((monsterID) => {
			_doAction(instance, monsterID);
		});
		_applyChanges(instance)
		_clearActions(instance);
		return instance;
	};

	const _speedContest = (instance) => {
		let sortedMonsters = [];
		let tempMonstersList = [];
		for (const [key, value] of Object.entries(instance)) {
			tempMonstersList = tempMonstersList.concat(value.onBoard);
		}

		_getPlacesOnRound(_shuffleMonsters(tempMonstersList), sortedMonsters);

		return sortedMonsters;
	};

	const _shuffleMonsters = (tempMonstersList) => {
		const shuffleIndicators = [];
		for (let i = 1; i <= tempMonstersList.length; i++) {
			shuffleIndicators.push(i);
		}

		const shuffleArray = (array) => {
			const _reverseItem = (list, id1, id2) => {
				const temp = list[id1];
				list[id1] = list[id2];
				list[id2] = temp;
			};

			const _allyPriority = (id1, id2) => {
				if (array[id1] > array[id2]) {
					_reverseItem(array, id1, id2);
				}
			};

			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				_reverseItem(array, i, j);
			}

			for (let l = 1; l <= array.length - 1; l++) {
				if (tempMonstersList[l - 1].playerID === tempMonstersList[l].playerID)
					_allyPriority(l - 1, l);
			}

			return array;
		};

		shuffleArray(shuffleIndicators);
		const monsterListWithShuffleID = [];

		for (let index = 0; index < shuffleIndicators.length; index++) {
			monsterListWithShuffleID.push({
				shuffleID: shuffleIndicators[index],
				monster: tempMonstersList[index],
			});
		}
		return monsterListWithShuffleID;
	};

	const _getPlacesOnRound = (speedContestTempsList, sortedMonsters) => {
		speedContestTempsList.forEach((tempMonster) => {
			const count = speedContestTempsList.filter((speedContest) => {
				if (
					speedContest.monster.stats.speed > tempMonster.monster.stats.speed || // if different speed
					(speedContest.monster.stats.speed ===
						tempMonster.monster.stats.speed && // if same speed but different team
						speedContest.shuffleID < tempMonster.shuffleID)
				)
					return true;
				return false;
			}).length;
			sortedMonsters[count] = tempMonster.monster.id;
		});
	};

	const effectsType = () => {
		const damage = (instance, actionsByTarget, power) => {
			console.log("damage from ", actionsByTarget.sourceID, " to ", actionsByTarget.targetID);
			_doCalculDamage(instance, actionsByTarget, power);
		};

		const equilibre = (instance, actionsByTarget, power) => {
			console.log("equilibre from ", actionsByTarget.sourceID, " to ", actionsByTarget.targetID);
		};

		const heal = (instance, actionsByTarget, power) => {
			console.log("heal from ", actionsByTarget.sourceID, " to ", actionsByTarget.targetID);
		};

		const swap = (instance, actionsByTarget) => {
			console.log("swap on", actionsByTarget.sourceID, " with ", actionsByTarget.targetID);
			_swapOnBoard(instance, actionsByTarget)
		}


		return { damage, equilibre, heal, swap };
	};

	const _doAction = (instance, monsterID) => {
		if (_isAvailableToPlayRound(instance, monsterID)) {
			const actionFromMonster = _getActionByMonsterID(instance, monsterID);
			const effectListByTarget = _getEffectListByTarget(instance, actionFromMonster );
			effectListByTarget.targets.forEach((actionsByTarget) => {
				actionsByTarget.skill.effects.forEach((effect) => {
					//effectsType()[effect.type](instance, actionsByTarget, effect.power);
					passif(effectsType()[effect.type], actionsByTarget, effect.power, effect.type, instance);
				});
			});
		}
	};

	const _applyChanges = (instance) => {
		for (const [key, player] of Object.entries(instance)) {
			player.onBoard.forEach((onBoardMonster) => {
				const teamMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === onBoardMonster.id)
				player.team[teamMonsterIndex] = onBoardMonster
			})
		}
	}

	const passif = (action, target, power, actionType, instance) => {
		const ennemies = (owner) => {
			return _getEnnemies(instance, owner.id);
		};
		const ally = (owner) => {
			return [_getAlly(instance, owner.id)];
		};
		const allies = (owner) => {
			return instance[owner.playerID].onBoard;
		};
		const self = (owner) => {
			return [owner];
		};

		const fromType = { ennemies, ally, allies, self };

		const checkPassif = (from, to, owner) => {
			if (owner.passif.trigger.actionType !== actionType) return false;
			const ownerFrom = fromType[owner.passif.trigger.from](owner);
			const ownerTo = fromType[owner.passif.trigger.to](owner);
			if (
				!ownerFrom.some((monster) => {
					return monster.id === from.id;
				})
			)
				return false;
			if (
				!ownerTo.some((monster) => {
					return monster.id === to;
				})
			)
				return false;
			if (owner.passif.trigger.type) {
				if (owner.passif.trigger.type !== target.skill.type) return false;
			}
			if (owner.passif.trigger.target) {
				if (owner.passif.trigger.target !== target.skill.target) return false;
			}
			return true;
		};

		const applyEffects = (owner, from) => {
			const effectsListbyTarget = _getEffectListByTarget(instance, {
				sourceID: owner.id,
				targetID: from.id,
				skill: {
					effects: owner.passif.event.effects,
					target: owner.passif.event.target,
					name: owner.passif.name,
					description: owner.passif.description,
					type: "neutral",
				},
			});
			if (effectsListbyTarget <= 0) return false;
			effectsListbyTarget.targets.forEach((target) => {
				target.skill.effects.forEach((effect) => {
					effectsType()[effect.type](instance, target, effect.power);
				});
			});
		};

		const before = (from, to, owner) => {
			if (!checkPassif(from, to, owner)) return false;
			console.log("before triggered by :" + owner.name);
			applyEffects(owner, from);

			return true;
		};

		const prevent = (from, to, owner) => {
			console.log("try to prevent :" + owner.id);
			if (!checkPassif(from, to, owner)) return false;
			applyEffects(owner, from);

			console.log("prevent triggered by :" + owner.name);
			return true;
		};

		const after = (from, to, owner) => {
			// console.log("check passif :" + checkPassif(from, to, owner));
			if (!checkPassif(from, to, owner)) return false;
			console.log("after triggered by :" + owner.name);
			applyEffects(owner, from);

			return true;
		};

		const eventWhen = { before, after, prevent };

		let passifBefore = [];
		let passifPrevent = [];
		let passifAfter = [];

		for (const value of Object.values(instance)) {
			value.onBoard.forEach((monster) => {
				switch (monster.passif.trigger.when) {
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
		}

		const loopThroughPassif = (whenArray) => {
			if (whenArray.length <= 0) return false;
			let prevented = false;
			for (let i = 0; i < whenArray.length; i++) {
				const monster = whenArray[i];
				if (
					eventWhen[monster.passif.trigger.when](
						_getOnBoardMonsterByID(instance, target.sourceID),
						target.targetID,
						monster
					) &&
					monster.passif.when === "prevent"
				)
					prevented = true;
			}
			return prevented;
		};

		loopThroughPassif(passifBefore);
		if (!loopThroughPassif(passifPrevent)) action(instance, target, power);
		loopThroughPassif(passifAfter);
	};

	const _isAvailableToPlayRound = (instance, monsterID) => {
		return _getOnBoardMonsterByID(instance, monsterID).stats.hp > 0;
	};

	const _swapOnBoard = (instance, actionsByTarget) => {
		const sourceMonster = _getOnBoardMonsterByID(instance, actionsByTarget.sourceID)
		const player = instance[sourceMonster.playerID]
		const teamSourceMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === actionsByTarget.sourceID)
		player.team[teamSourceMonsterIndex] = sourceMonster

		const teamTargetMonsterIndex = player.team.findIndex((teamMonster) => teamMonster.id === ((parseInt(sourceMonster.playerID) / 100000) * 4).toString()) // actionsByTarget.targetID
		const onBoardSourceMonsterIndex = player.onBoard.findIndex((onBoardMonster) => onBoardMonster.id === actionsByTarget.sourceID)
		player.onBoard[onBoardSourceMonsterIndex] = player.team[teamTargetMonsterIndex]

	}

	const _doCalculDamage = (instance, target, power) => {
		const skill = target.skill;
		const monsterSource = _getOnBoardMonsterByID(instance, target.sourceID);
		const monsterTarget = _getOnBoardMonsterByID(instance, target.targetID);
		const typeEfficiency = _getTypeEfficiency(skill.type, monsterTarget.type);
		const isSTAB = _isSTAB(monsterSource.type, skill.type);

		const hpChanges =
			-(
				(
					(monsterSource.stats.attack * power) / // source
					(monsterTarget.stats.def * 0.5)
				) // target
			) *
			(typeEfficiency * isSTAB); // multiplying factor
		monsterTarget.stats.hp += hpChanges;
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

	const _clearActions = (instance) => {
		for (const [key, value] of Object.entries(instance)) {
			value.actions = [];
		}
	};

	const _getActionByMonsterID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.actions.some((action) => action.sourceID === monsterID)) {
				return value.actions.filter(
					(action) => action.sourceID === monsterID
				)[0]; // voir si on peux mieux faire
			}
		}
	};

	const _getEffectListByTarget = (instance, actionFromMonster) => {
		const self = () => {
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];
			return {
				targets: [
					{
						sourceID: actionFromMonster.sourceID,
						targetID: actionFromMonster.sourceID,
						skill: actionFromMonster.skill,
					},
				],
			};
		};

		const ally = () => {
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];
			const ally = _getAlly(instance, actionFromMonster.sourceID);

			if (ally === undefined) return { targets: [] };
			return {
				targets: [
					{
						sourceID: actionFromMonster.sourceID,
						targetID: ally.id,
						skill: actionFromMonster.skill,
					},
				],
			};
		};

		const allies = () => {
			const effectListByTarget = { targets: [] };
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];

			instance[
				_getOnBoardMonsterByID(instance, actionFromMonster.sourceID).playerID
			].onBoard.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: actionFromMonster.sourceID,
					targetID: monster.id,
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const ennemies = () => {
			const effectListByTarget = { targets: [] };
			const targetsList = _getEnnemies(instance, actionFromMonster.sourceID);
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];

			targetsList.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: actionFromMonster.sourceID,
					targetID: monster.id,
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const single = () => {
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];
			return {
				targets: [
					{
						sourceID: actionFromMonster.sourceID,
						targetID: actionFromMonster.targetID,
						skill: actionFromMonster.skill,
					},
				],
			};
		};

		const double = () => {
			const effectListByTarget = { targets: [] };
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];

			instance[_getOnBoardMonsterByID(instance, actionFromMonster.targetID)
					.playerID].onBoard.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: actionFromMonster.sourceID,
					targetID: monster.id,
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const all = () => {
			const effectListByTarget = { targets: [] };
			let targetsList = [];
			actionFromMonster.skill.effects = actionFromMonster.skill.effects[0];

			for (const [key, value] of Object.entries(instance)) {
				targetsList = targetsList.concat(value.onBoard);
			}
			targetsList.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: actionFromMonster.sourceID,
					targetID: monster.id,
					skill: actionFromMonster.skill,
				});
			});

			return effectListByTarget;
		};

		const TargetTypes = { self, ally, allies, ennemies, single, double, all };
		return TargetTypes[actionFromMonster.skill.target]();
	};

	const _getAlly = (instance, monsterID) => {
		return instance[_getOnBoardMonsterByID(instance, monsterID).playerID].onBoard.filter(
			(monster) => monster.id !== monsterID
		)[0] !== undefined
			? instance[_getOnBoardMonsterByID(instance, monsterID).playerID].onBoard.filter(
					(monster) => monster.id !== monsterID
			  )[0]
			: [];
	};

	const _getEnnemies = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.onBoard.every((monster) => monster.id !== monsterID)) {
				return value.onBoard;
			}
		}
	};

	const _getOnBoardMonsterByID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.onBoard.some((monster) => monster.id === monsterID)) {
				return value.onBoard.filter((monster) => monster.id === monsterID)[0]; // voir si améliorable
			}
		}
	};

	return { ready, waitActions };
};

export default fight;
