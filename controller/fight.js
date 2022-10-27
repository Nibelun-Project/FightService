const getTeam = (playerID) => {
	return [
		{
			id: ((parseInt(playerID) / 100000) * 1).toString(),
			name: "ronkarétoal" + playerID,
			type: ["fire","mental"],
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
			passifId: 2,
			skills: [1, 2, 3, 4, 5, 6, 7, 8],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		}/*,
		{
			id: ((parseInt(playerID) / 100000) * 2).toString(),
			name: "étoalronkaré" + playerID,
			type: ["fire","mental"],
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
			passifId: 2,
			skills: [1, 2, 3, 4, 5, 6, 7, 8],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		}*/
	];
};

const fight = () => {
	let mapFights = {};

	const ready = (match) => {
		for (const [key, value] of Object.entries(match)) {
			value["team"] 	 = getTeam(key);
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
		_clearActions(instance)
		return instance;
	};

	const _speedContest = (instance) => {
		let sortedMonsters 	 = [];
		let tempMonstersList = [];
		for (const [key, value] of Object.entries(instance)) {
			tempMonstersList = tempMonstersList.concat(value.team);
		}
		
		_getPlacesOnRound(_shuffleMonsters(tempMonstersList), sortedMonsters)

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
				list[id1]  = list[id2];
				list[id2]  = temp;
			}

			const _allyPriority = (id1, id2) => {
				if (array[id1] > array[id2]) {
					_reverseItem(array, id1, id2)
				}
			}

			for (let i = array.length - 1; i > 0; i--) {
				const j    = Math.floor(Math.random() * (i + 1));
				_reverseItem(array, i, j);
			}
			
			for (let l = 1; l <= array.length - 1; l++) {
				if (tempMonstersList[l-1].playerID === tempMonstersList[l].playerID) _allyPriority(l-1, l)
			}

			return array;
		};

		shuffleArray(shuffleIndicators);
		const monsterListWithShuffleID = [];

		for (let index = 0; index < shuffleIndicators.length; index++) {
			monsterListWithShuffleID.push({ shuffleID: shuffleIndicators[index], monster: tempMonstersList[index] });
		}
		return monsterListWithShuffleID
	}

	const _getPlacesOnRound = (speedContestTempsList, sortedMonsters) => {
		speedContestTempsList.forEach((tempMonster) => {
			const count = speedContestTempsList.filter((speedContest) => {
				if ( speedContest.monster.stats.speed  >  tempMonster.monster.stats.speed ||	// if different speed
					(speedContest.monster.stats.speed === tempMonster.monster.stats.speed &&	// if same speed but different team
					 speedContest.shuffleID 		   <  tempMonster.shuffleID))
					return true;
				return false;
			}).length;
			sortedMonsters[count] = tempMonster.monster.id;
		});
	} 

	const _doAction = (instance, monsterID) => {

		/**
		 * définir toutes les actions  possible
		 */
		const damage = (target, power) => {
			console.log('damage from ', target.sourceID, ' to ', target.targetID);
			_doCalculDamage(instance, target, power);

		}

		const heal = (target, power) => {
			console.log('heal from ', target.sourceID, ' to ', target.targetID);
		}

		const equilibre = (target, power) => {
			console.log('equilibre from ', target.sourceID, ' to ', target.targetID);
		}

		const effectsType = {damage, heal, equilibre};		
		
		if (_isAvailableToPlayRound(instance, monsterID)) {		
			const actionFromMonster  = _getActionByMonsterID(instance, monsterID);
			actionFromMonster.action = _getActionByID(actionFromMonster.skillID)
			const effectListByTarget = _getEffectListByTarget(instance, actionFromMonster)
			effectListByTarget.targets.forEach(target => {
				target.action.effects.forEach((effect) => {
					effectsType[effect.type](target, effect.power);
				})
			});
		}
	};

	const _isAvailableToPlayRound = (instance, monsterID) => {
		return _getMonsterByID(instance, monsterID).stats.hp > 0
	}

	const _doCalculDamage = (instance, target, power) => {
		const skill 		 = target.action;
		const monsterSource  = _getMonsterByID(instance, target.sourceID);
		const monsterTarget  = _getMonsterByID(instance, target.targetID);
		const typeEfficiency = _getTypeEfficiency(skill.type, monsterTarget.type);
		const isSTAB 		 = _isSTAB(monsterSource.type, skill.type);

		const hpChanges =
			-(
				(
					(monsterSource.stats.attack * power) / // source
					(monsterTarget.stats.def * 0.5) // target
				)
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
		})
		return 1;
	};

	const _getTypeAffinities = (type) => {
		const affinities = {
			fire: 	 {fire: 1, mental: 1, neutral: 1},
			mental:  {fire: 1, mental: 1, neutral: 2},
			neutral: {fire: 1, mental: 1, neutral: 0.5}
		}
		return affinities[type.toString()]
	}

	const _getTypeEfficiency = (skillType, targetTypes) => {
		const affinities = _getTypeAffinities(skillType)
		let efficiency 	 = 1;

		targetTypes.forEach((type) => {
			efficiency *= affinities[type]
		})

		return efficiency; 
	};

	const _clearActions = (instance) => {
		for (const [key, value] of Object.entries(instance)) {
			value.actions = [];
		}
	}

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
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]
			return {targets: [{sourceID: actionFromMonster.sourceID, targetID: actionFromMonster.sourceID, action: actionFromMonster.action}]};
		};

		const ally = () => {
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]
			const ally = _getAlly(instance, actionFromMonster.sourceID)

			if (ally === undefined) return {targets: []}
			return {targets: [{sourceID: actionFromMonster.sourceID, targetID: ally.id, action: actionFromMonster.action}]};
		};

		const allies = () => {
			const effectListByTarget = {targets: []};
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]

			instance[_getMonsterByID(instance, actionFromMonster.sourceID).playerID].team.forEach((monster) => {
				effectListByTarget.targets.push({sourceID: actionFromMonster.sourceID, targetID: monster.id, action: actionFromMonster.action})
			})

			return effectListByTarget
		};

		const ennemies = () => {
			const effectListByTarget 		 = {targets: []};
			const targetsList 	  	 		 = _getEnnemies(instance, actionFromMonster.sourceID);
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]

			targetsList.forEach((monster) => {
				effectListByTarget.targets.push({sourceID: actionFromMonster.sourceID, targetID: monster.id, action: actionFromMonster.action})
			})

			return effectListByTarget
		};

		const single = () => {
			const skill   = _getActionByID(actionFromMonster.skillID)
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]			
			return {targets: [{sourceID: actionFromMonster.sourceID, targetID: actionFromMonster.targetID, action: actionFromMonster.action}]};
		};

		const double = () => {
			const effectListByTarget 		 = {targets: []};
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]
			
			instance[_getMonsterByID(instance, actionFromMonster.targetID).playerID].team.forEach((monster) => {
				effectListByTarget.targets.push({sourceID: actionFromMonster.sourceID, targetID: monster.id, action: actionFromMonster.action})
			})

			return effectListByTarget
		};

		const all = () => {
			const effectListByTarget 		 = {targets: []};
			let targetsList 				 = [];
			actionFromMonster.action.effects = actionFromMonster.action.effects[0]

			for (const [key, value] of Object.entries(instance)) {
				targetsList = targetsList.concat(value.team);
			}

			targetsList.forEach((monster) => {
				effectListByTarget.targets.push({sourceID: actionFromMonster.sourceID, targetID: monster.id, action: actionFromMonster.action})
			})

			return effectListByTarget
		};

		const TargetTypes = {self, ally, allies, ennemies, single, double, all};
		return TargetTypes[_getActionByID(actionFromMonster.skillID).target]();
	}

	const _getAlly = (instance, monsterID) => {
		return instance[_getMonsterByID(instance, monsterID).playerID].team.filter((monster) => monster.id !== monsterID)[0];
	}
	
	const _getEnnemies = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.team.every((monster) => monster.id !== monsterID)) {
				return value.team;
			}
		}
	}

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
				effects: [[{type: "damage",    power:"45"},
						   {type: "equilibre", power:"5"}]],
				target: "single"
			},
			2: {
				name: "double",
				description: "text sample...",
				type: "fire",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "double"
			},
			3: {
				name: "ennemies",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}],
						   [{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "ennemies"
			},
			4: {
				name: "allies",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "allies"
			},
			5: {
				name: "ally",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "ally"
			},
			6: {
				name: "self",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "self"
			},
			7: {
				name: "all",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "all"
			},
			8: {
				name: "all",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "all"
			},
			9: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "single"
			},
			10: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "double"
			},
			11: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "self"
			},
			12: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "ally"
			},
			13: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "allies"
			},
			14: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "all"
			},
			15: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: [[{type: "damage",    power:"45"}, //same effects to all targets
						   {type: "equilibre", power:"5"}]],
				target: "ennemies"
			}

		};
		return sampleAttack[actionID.toString()];
	};

	return { ready, waitActions };
};

export default fight;
