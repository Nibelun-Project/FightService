const getTeam = (playerID) => {
	return [
		{
			id: ((parseInt(playerID) / 100000) * 1).toString(),
			name: "ronkarétoal" + playerID,
			type: {
				firstType: "fire",
				secondType: "mental",
			},
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
			skills: [1, 2, 3, 4],
			status: [],
			buff: [],
			playerID: playerID.toString(),
		},
		{
			id: ((parseInt(playerID) / 100000) * 2).toString(),
			name: "étoalronkaré" + playerID,
			type: {
				firstType: "fire",
				secondType: "mental",
			},
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
		const sortedMonstersID = _speedContest(instance);
		sortedMonstersID.forEach((monsterID) => {
			if (_getMonsterByID(instance, monsterID).stats.hp > 0) {
				const monstersChanges = _doAction(instance, monsterID);
				instance = _applyChanges(instance, monstersChanges);
			}
		});

		for (const [key, value] of Object.entries(instance)) {
			value.actions = [];
		}
		return instance;
	};

	const _speedContest = (instance) => {
		let sortedMonsters = [];
		let tempMonstersList = [];
		for (const [key, value] of Object.entries(instance)) {
			tempMonstersList = tempMonstersList.concat(value.team);
		}
		tempMonstersList.forEach((tempMonster) => {
			const count = tempMonstersList.filter((monster) => {
				if (
					monster.stats.speed > tempMonster.stats.speed ||
					(monster.stats.speed === tempMonster.stats.speed &&
						monster.id > tempMonster.id) // condition à changer
				)
					return true;
				return false;
			}).length;
			sortedMonsters[count] = tempMonster.id; // faut faire un check pour éviter un cas [ , x, , x, x, x] genre avec des champs vides
		});

		return sortedMonsters;
	};

	const _doAction = (instance, monsterID) => {
		const monstersChanges = [];
		const action = _getActionByMonsterID(instance, monsterID);

		/**
		 * définir toutes les actions  possible
		 */
		const damage = (target, power) => {
			console.log('damage from ', target.sourceID, ' to ', target.targetID);
			monstersChanges.push(_doCalculChanges(instance, target, power));
		}

		const heal = (target, power) => {
			console.log('heal from ', target.sourceID, ' to ', target.targetID);
		}

		const equilibre = (target, power) => {
			console.log('equilibre from ', target.sourceID, ' to ', target.targetID);

		}

		const actionsTypes = {damage, heal, equilibre};

		const targetsAndChanges = _getTargetAndChanges(instance, monsterID, action)
		targetsAndChanges.targets.forEach(target => {
			
			target.action.effects.forEach((effect) => {
				actionsTypes[effect.type](target, effect.power);
			})
			 
		});

		return monstersChanges;
	};

	const _applyChanges = (instance, changes) => {
		changes.forEach((change) => {
			instance[change.playerID.toString()].team.forEach((monster) => {
				if (monster.id === change.id) monster.stats.hp = change.stats.hp;
			});
		});
		return instance;
	};

	const _doCalculChanges = (instance, target, power) => {
		const skill = target.action;
		const monsterSource = _getMonsterByID(instance, target.sourceID);
		const monsterTarget = _getMonsterByID(instance, target.targetID);
		const typeEfficiency = _getTypeEfficiency(
			monsterSource.type,
			monsterTarget.type
		);
		const isSTAB = _isSTAB(monsterSource.type, skill.type);

		const hpChanges = // améliorer le calcul
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

	/**
	 * return 1.25 if true else return 1
	 */
	const _isSTAB = (monsterType, skillType) => {
		if (monsterType.firstType === skillType || monsterType.secondType === skillType) {
			return 1.25;
		}
		return 1;
	};

	const _getTypeEfficiency = (sourceType, targetType) => {
		return 1; // A faire
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

	const _getTargetAndChanges = (instance, monsterID, action) => {

		const self = () => {
			const tempAction = _getActionByID(action.skillID)
			tempAction.effects = tempAction.effects.first
			return {targets: [{sourceID: monsterID, targetID: monsterID, action: tempAction}]};
		};

		const ally = () => {
			const tempAction = _getActionByID(action.skillID)
			tempAction.effects = tempAction.effects.first
			return {targets: [{sourceID: monsterID, targetID: _getAlly(instance, monsterID).id, action: tempAction}]};
		};

		const allies = () => {
			const targets = {targets: []};
			const skill = _getActionByID(action.skillID)
			const listEffects = skill.effects

			skill.effects = listEffects.first
			targets.targets.push({sourceID: monsterID, targetID: monsterID, action: skill})

			skill.effects = listEffects.second
			targets.targets.push({sourceID: monsterID, targetID: _getAlly(instance, monsterID).id, action: skill})

			return targets
		};

		const ennemies = () => {
			const targets = {targets: []};
			const skill = _getActionByID(action.skillID)
			const listEffects = skill.effects
			const ennemies = _getEnnemies(instance, monsterID);

			skill.effects = listEffects.first
			targets.targets.push({sourceID: monsterID, targetID: ennemies[0].id, action: skill})

			skill.effects = listEffects.second
			targets.targets.push({sourceID: monsterID, targetID: ennemies[1].id, action: skill})

			return targets
		};

		const single = () => {
			const tempAction = _getActionByID(action.skillID)
			tempAction.effects = tempAction.effects.first
			return {targets: [{sourceID: monsterID, targetID: action.targetID, action: tempAction}]};
		};

		const double = () => {
			const targets = {targets: []};
			const skill = _getActionByID(action.skillID)
			const listEffects = skill.effects

			skill.effects = listEffects.first
			targets.targets.push({sourceID: monsterID, targetID: action.targetID, action: skill})

			skill.effects = listEffects.second
			targets.targets.push({sourceID: monsterID, targetID: _getAlly(instance, action.targetID).id, action: skill})

			return targets
		};

		const all = () => {
			const targets = {targets: []};
			const skill = _getActionByID(action.skillID)
			const listEffects = skill.effects
			let tempMonstersList = [];

			for (const [key, value] of Object.entries(instance)) {
				tempMonstersList = tempMonstersList.concat(value.team);
			}

			skill.effects = listEffects.first
			targets.targets.push({sourceID: monsterID, targetID: tempMonstersList[0].id, action: skill})

			skill.effects = listEffects.second
			targets.targets.push({sourceID: monsterID, targetID: tempMonstersList[1].id, action: skill})

			skill.effects = listEffects.third
			targets.targets.push({sourceID: monsterID, targetID: tempMonstersList[2].id, action: skill})

			skill.effects = listEffects.fourth
			targets.targets.push({sourceID: monsterID, targetID: tempMonstersList[3].id, action: skill})

			return targets
		};

		const TargetTypes = {self, ally, allies, ennemies, single, double, all};

		return TargetTypes[_getActionByID(action.skillID).target]();
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
		const sampleAttack = {
			1: {
				name: "charge",
				description: "text sample...",
				type: "fire",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "single"
			},
			2: {
				name: "charge",
				description: "text sample...",
				type: "mental",
				effects: {first:  [{type: "damage",    power:"10"},
							  	   {type: "equilibre", power:"10"}],
						  second: [{type: "damage",    power:"20"},
						   	  	   {type: "equilibre", power:"5"}]},
				target: "ennemies"
			},
			3: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "self"
			},
			4: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "ally"
			},
			5: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "single"
			},
			6: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first:  [{type: "damage",    power:"60"},
							  	   {type: "equilibre", power:"10"}],
						  second: [{type: "damage",    power:"30"},
						   	  	   {type: "equilibre", power:"5"}]},
				target: "ennemies"
			},
			7: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
								  {type: "equilibre", power:"5"}]},
				target: "self"
			},
			8: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "ally"
			},
			9: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "single"
			},
			10: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first:  [{type: "damage",    power:"30"},
							  	   {type: "equilibre", power:"2"}],
						  second: [{type: "damage",    power:"60"},
						   	  	   {type: "equilibre", power:"3"}]},
				target: "double"
			},
			11: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"45"},
							  	  {type: "equilibre", power:"5"}]},
				target: "self"
			},
			12: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first: [{type: "damage",    power:"30"},
								  {type: "equilibre", power:"2"}]},
				target: "ally"
			},
			13: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first:  [{type: "damage",    power:"30"},
							  	   {type: "equilibre", power:"2"}],
						  second: [{type: "damage",    power:"30"},
						  		   {type: "equilibre", power:"2"}]},
				target: "allies"
			},
			14: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first:  [{type: "damage",    power:"50"},
							  	   {type: "equilibre", power:"10"}],
						  second: [{type: "damage",    power:"45"},
						   	  	   {type: "equilibre", power:"5"}],
						  third:  [{type: "damage",    power:"50"},
								   {type: "equilibre", power:"10"}],
						  fourth: [{type: "damage",    power:"45"},
								   {type: "equilibre", power:"5"}]},
				target: "all"
			},
			15: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				effects: {first:  [{type: "damage",    power:"10"},
							  	   {type: "equilibre", power:"10"}],
						  second: [{type: "damage",    power:"20"},
						   	  	   {type: "equilibre", power:"5"}]},
				target: "ennemies"
			}
		};
		return sampleAttack[actionID.toString()];
	};

	return { ready, waitActions };
};

export default fight;
