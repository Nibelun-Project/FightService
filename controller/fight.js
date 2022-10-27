const getTeam = (playerID) => {
	const idP = (indice) => {
		return ((parseInt(playerID) / 100000) * indice).toString();
	};
	return [
		{
			id: idP(1),
			name: "ronkarétoal" + idP(1),
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
					from: "ennemies",
					to: "ally",
					type: "fire",
					target: "single",
				},
				event: {
					target: "self",
					effects: [
						[
							{ type: "heal", power: "15" }, //same effects to all targets
						],
					],
				},
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [1, 2, 3, 4],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		},
		{
			id: idP(2),
			name: "étoalronkaré" + idP(2),
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
					from: "ennemies",
					to: "allies",
					type: "fire",
					target: "double",
				},
				event: {
					target: "self",
					effects: [
						[
							{ type: "heal", power: "15" }, //same effects to all targets
						],
					],
				},
				name: "Preventive Heal",
				description: "you heal yourself or your ally before damage",
			},
			skills: [5, 6, 7, 8],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		},
	];
};

const fight = () => {
	let mapFights = {};

	const ready = (match) => {
		for (const [key, value] of Object.entries(match)) {
			value["team"] = getTeam(key);
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
			const modifiedInstance = _playRound(mapFights[fightID]);
			mapFights[fightID] = modifiedInstance;
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
		_clearActions(instance);
		return instance;
	};

	const _speedContest = (instance) => {
		let sortedMonsters = [];
		let tempMonstersList = [];
		for (const [key, value] of Object.entries(instance)) {
			tempMonstersList = tempMonstersList.concat(value.team);
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

	const _doAction = (instance, monsterID) => {
		/**
		 * définir toutes les actions  possible
		 */
		const damage = (target, power) => {
			console.log("damage from ", target.sourceID, " to ", target.targetID);
			_doCalculDamage(instance, target, power);
		};

		const heal = (target, power) => {
			console.log("heal from ", target.sourceID, " to ", target.targetID);
		};

		const equilibre = (target, power) => {
			console.log("equilibre from ", target.sourceID, " to ", target.targetID);
		};

		const effectsType = { damage, heal, equilibre };

		if (_isAvailableToPlayRound(instance, monsterID)) {
			const actionFromMonster = _getActionByMonsterID(instance, monsterID);
			const effectListByTarget = _getEffectListByTarget(
				instance,
				monsterID,
				actionFromMonster
			);
			effectListByTarget.targets.forEach((target) => {
				target.action.effects.forEach((effect) => {
					passif(
						effectsType[effect.type],
						target,
						effect.power,
						effect.type,
						instance
					);
				});
			});
		}
	};

	const passif = (action, target, power, actionType, instance) => {
		const ennemies = (owner) => {
			return _getEnnemies(instance, owner.id);
		};
		const ally = (owner) => {
			return [_getAlly(instance, owner.id)];
		};
		const allies = (owner) => {
			return instance[owner.playerID].team;
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
				console.log(owner.passif.trigger.type, target.action.type);
				if (owner.passif.trigger.type !== target.action.type) return false;
			}
			if (owner.passif.trigger.target) {
				console.log(owner.passif.trigger.target, target.action.target);
				if (owner.passif.trigger.target !== target.action.target) return false;
			}
			return true;
		};

		const applyEffects = (owner, from) => {
			const effectsListbyTarget = _getEffectListByTarget({
				sourceID: owner.id,
				targetID: from,
				action: {
					effects: owner.passif.event.effects,
					targetType: owner.passif.event.target,
					name: owner.passif.name,
					description: owner.passif.description,
					type: "passive",
				},
			});
			if (effectsListbyTarget <= 0) return false;
			effectsListbyTarget.targets.forEach((target) => {
				target.action.effects.forEach((effect) => {
					effectsType[effect.type](target, effect.power);
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
			value.team.forEach((monster) => {
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
						_getMonsterByID(instance, target.sourceID),
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
		if (!loopThroughPassif(passifPrevent)) action(target, power);
		loopThroughPassif(passifAfter);
	};

	const _isAvailableToPlayRound = (instance, monsterID) => {
		return _getMonsterByID(instance, monsterID).stats.hp > 0;
	};

	const _doCalculDamage = (instance, target, power) => {
		const skill = target.action;
		const monsterSource = _getMonsterByID(instance, target.sourceID);
		const monsterTarget = _getMonsterByID(instance, target.targetID);
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

	const _getEffectListByTarget = (instance, monsterID, action) => {
		//sourceID, targetID, skill
		const self = () => {
			const skill = _getActionByID(action.skillID);
			skill.effects = skill.effects[0];
			return {
				targets: [{ sourceID: monsterID, targetID: monsterID, action: skill }],
			};
		};

		const ally = () => {
			const skill = _getActionByID(action.skillID);
			const effectListByTarget = { targets: [] };
			skill.effects = skill.effects[0];
			const ally = _getAlly(instance, monsterID);

			ally.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: monsterID,
					targetID: monster.id,
					action: skill,
				});
			});
			return effectListByTarget;
		};

		const allies = () => {
			const skill = _getActionByID(action.skillID);
			const effectListByTarget = { targets: [] };
			skill.effects = skill.effects[0];

			instance[_getMonsterByID(instance, monsterID).playerID].team.forEach(
				(monster) => {
					effectListByTarget.targets.push({
						sourceID: monsterID,
						targetID: monster.id,
						action: skill,
					});
				}
			);

			return effectListByTarget;
		};

		const ennemies = () => {
			const skill = _getActionByID(action.skillID);
			const effectListByTarget = { targets: [] };
			const targetsList = _getEnnemies(instance, monsterID);
			skill.effects = skill.effects[0];

			targetsList.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: monsterID,
					targetID: monster.id,
					action: skill,
				});
			});

			return effectListByTarget;
		};

		const single = () => {
			const skill = _getActionByID(action.skillID);
			skill.effects = skill.effects[0];

			return {
				targets: [
					{ sourceID: monsterID, targetID: action.targetID, action: skill },
				],
			};
		};

		const double = () => {
			const skill = _getActionByID(action.skillID);
			const effectListByTarget = { targets: [] };
			skill.effects = skill.effects[0];

			instance[
				_getMonsterByID(instance, action.targetID).playerID
			].team.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: monsterID,
					targetID: monster.id,
					action: skill,
				});
			});

			return effectListByTarget;
		};

		const all = () => {
			const skill = _getActionByID(action.skillID);
			const effectListByTarget = { targets: [] };
			let targetsList = [];
			skill.effects = skill.effects[0];

			for (const [key, value] of Object.entries(instance)) {
				targetsList = targetsList.concat(value.team);
			}

			targetsList.forEach((monster) => {
				effectListByTarget.targets.push({
					sourceID: monsterID,
					targetID: monster.id,
					action: skill,
				});
			});

			return effectListByTarget;
		};

		const TargetTypes = { self, ally, allies, ennemies, single, double, all };
		return TargetTypes[_getActionByID(action.skillID).target]();
	};

	const _getAlly = (instance, monsterID) => {
		return instance[_getMonsterByID(instance, monsterID).playerID].team.filter(
			(monster) => monster.id !== monsterID
		)[0] !== undefined
			? instance[_getMonsterByID(instance, monsterID).playerID].team.filter(
					(monster) => monster.id !== monsterID
			  )[0]
			: [];
	};

	const _getEnnemies = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.team.every((monster) => monster.id !== monsterID)) {
				return value.team;
			}
		}
	};

	const _getMonsterByID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.team.some((monster) => monster.id === monsterID)) {
				return value.team.filter((monster) => monster.id === monsterID)[0]; // voir si améliorable
			}
		}
	};

	const _getActionByID = (actionID) => {
		//self, ally, allies, ennemies, single, double, all
		const sampleAttack = {
			1: {
				name: "single",
				description: "text sample...",
				type: "fire",
				effects: [
					[
						{ type: "damage", power: "45" },
						{ type: "equilibre", power: "5" },
					],
				],
				target: "single",
			},
			2: {
				name: "all",
				description: "text sample...",
				type: "fire",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "all",
			},
			3: {
				name: "ennemies",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "ennemies",
			},
			4: {
				name: "allies",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "allies",
			},
			5: {
				name: "allies",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "allies",
			},
			6: {
				name: "ennemies",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "ennemies",
			},
			7: {
				name: "all",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "all",
			},
			8: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "single",
			},
			9: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "single",
			},
			10: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "double",
			},
			11: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "self",
			},
			12: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "ally",
			},
			13: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "allies",
			},
			14: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "all",
			},
			15: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [
					[
						{ type: "damage", power: "45" }, //same effects to all targets
						{ type: "equilibre", power: "5" },
					],
				],
				target: "ennemies",
			},
		};
		return sampleAttack[actionID.toString()];
	};

	return { ready, waitActions };
};

export default fight;
