const getTeam = (playerID) => {
	return [
		{
			id: ((parseInt(playerID) / 100000) * 1).toString(),
			name: "ronkarétoal",
			typeName: {
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
		},
		{
			id: ((parseInt(playerID) / 100000) * 2).toString(),
			name: "étoalronkaré",
			typeName: {
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
		if (!mapFights[fightID]) return null;
		mapFights[fightID][playerID].actions = actions;
		if (_isActionsFilled(mapFights[fightID])) {
			const modifiedInstance = _playRound(mapFights[fightID]);
			mapFights[fightID] = modifiedInstance;
			return mapFights[fightID];
		} else return null;
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
			value.team.forEach((monster) => {
				monster.playerID = key; // Ca a rien a faire ici faut le changer d'endroit
			});
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

	const _getActionByMonsterID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.actions.some((action) => action.sourceID === monsterID)) {
				return value.actions.filter(
					(action) => action.sourceID === monsterID
				)[0]; // voir si on peux mieux faire
			}
		}
	};

	const _getActionByID = (actionID) => {
		const sampleAttack = {
			1: {
				name: "charge",
				description: "text sample...",
				type: "neutral",
				degat: "45",
				equilibre: "5",
				target: "single",
			},
		};
		return sampleAttack[actionID.toString()];
	};

	const _applyChanges = (instance, changes) => {
		changes.forEach((change) => {
			instance[change.playerID.toString()].team.forEach((monster) => { // ca serait bien de pas avoir un deuxieme forEach à faire. voir si possible
				if (monster.id === change.id) monster.stats.hp = change.stats.hp; //try this => monster = change
			});
		});
		return instance;
	};

	const _doAction = (instance, monsterID) => {
		const monstersChanges = []; // voir la porté de cette variable (cause peut etre des probleme si plusieur combat en meme temps)
		const action = _getActionByMonsterID(instance, monsterID);

		monstersChanges.push(_doCalculChanges(instance, action));
		return monstersChanges;
	};

	const _getMonsterByID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.team.some((monster) => monster.id === monsterID)) {
				return value.team.filter((monster) => monster.id === monsterID)[0]; // voir si améliorable
			}
		}
	};

	const _doCalculChanges = (instance, action) => {
		const skill = _getActionByID(action.skillID);
		const monsterSource = _getMonsterByID(instance, action.sourceID);
		const monsterTarget = _getMonsterByID(instance, action.targetID);
		const typeEfficiency = _getTypeEfficiency(
			monsterSource.type,
			monsterTarget.type
		);
		const isSTAB = _isSTAB(monsterSource.type, skill.type);

		// considérer d'autre changement que juste hp ( autres stats, changement de montre, attendre...)

		const hpChanges = // améliorer le calcul
			-(
				(monsterSource.stats.attack * skill.degat) / // source
				(monsterTarget.stats.def * 0.5)// target
			) * 
			(typeEfficiency * isSTAB); // multiplying factor
		monsterTarget.stats.hp += hpChanges;
		return monsterTarget;
	};

	/**
	 * return 1.25 if true else return 1
	 */
	const _isSTAB = (monsterType, skillType) => {
		return 1; // A faire
	};

	const _getTypeEfficiency = (sourceType, targetType) => {
		return 1; // A faire
	};

	return { ready, waitActions };
};

export default fight;
