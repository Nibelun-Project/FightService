// let mapFights = {};

// const getMapFight = () => {
// 	return mapFights;
// };

// const setMapFightById = (fightId, playersInfo) => {
// 	mapFights[fightId.toString()] = playersInfo;
// };

// const getNewFightId = () => {
// 	return "fid_" + Date.now().toString();
// };

// const launchFight = (playersInfo) => {
// 	const fightId = getNewFightId();
// 	setMapFightById(fightId, playersInfo);
// 	console.log("fight n°", fightId, "started");
// 	console.log(getMapFight());
// 	return { id: fightId };
// };

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
				def: 100,
				speed: (parseInt(playerID) / 100000) * 50,
				// precision: 100,
				// statusRes: 100,
				stamina: 100,
				balance: 100,
			},
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
		// const tempInstance = mapFights[fightID];
		if (!mapFights[fightID]) return null;
		//On remplis le champ "actions" avec les actions envoyé par le client
		//Mais c'est la variable temporaire pas l'objet globale 'mapFights'
		//Donc fonctionne mais seulement dans le contexte ou on a que 2 joueurs dès qu'on dépasse
		//je pense que ça bug

		//Solution est de MapFights[fightID] = tempInstance
		//Comme ça on sauvegarde dans mapFights au bon endroit(fightID) les modifs faite a la variable temporaire
		mapFights[fightID][playerID].actions = actions;

		//il faut changer le paramètre et envoyer "mapFights[fightID]"
		if (_isActionsFilled(mapFights[fightID])) {
			//il faut changer le paramètre et envoyer "mapFights[fightID]"
			const modifyInstance = _playRound(mapFights[fightID]);
			mapFights[fightID] = modifyInstance;
			//je retournerai "mapFights[fightID]" en gage de sureté que mon
			//"mapFights[fightID]" est bien le meme que l'object renvoyé au client
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
		console.log(instance);
		//speed contest
		const sortedMonstersID = _speedContest(instance);
		//do actions
		sortedMonstersID.forEach((monsterID) => {
			if (_getMonsterByID(instance, monsterID).stats.hp > 0) {
				const monstersChanges = _doAction(instance, monsterID);
				instance = _applyChanges(instance, monstersChanges);
			}
		});
		//clear actions
		for (const [key, value] of Object.entries(instance)) {
			value.actions = [];
		}

		//send info
		return instance;
	};

	const _speedContest = (instance) => {
		let sortedMonsters = [];
		let tempMonstersList = [];
		for (const [key, value] of Object.entries(instance)) {
			value.team.forEach((monster) => {
				monster.playerID = key;
			});
			tempMonstersList = tempMonstersList.concat(value.team);
		}
		tempMonstersList.forEach((tempMonster) => {
			const count = tempMonstersList.filter((monster) => {
				//condition a refaire
				if (
					monster.stats.speed > tempMonster.stats.speed ||
					(monster.stats.speed === tempMonster.stats.speed &&
						monster.id > tempMonster.id)
				)
					return true;
				return false;
			}).length;
			sortedMonsters[count] = tempMonster.id;
		});

		return sortedMonsters;
	};

	const _getActionByMonsterID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.actions.some((action) => action.sourceID === monsterID)) {
				return value.actions.filter(
					(action) => action.sourceID === monsterID
				)[0];
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
				// status: /[{ id: 1, round: 2 }]/ [],
				// buff: /[{ id: 2, value: 5}]/ [],
				target: "single", ///double, "clock-wise", everyone, ennemies/
			},
		};
		return sampleAttack[actionID.toString()];
	};

	const _applyChanges = (instance, changes) => {

		changes.forEach(change => {
			instance[change.playerID.toString()].team.forEach(monster => {
				if (monster.id === change.id) monster.stats.hp = change.stats.hp //try this => monster = change
			})
		})
		// for (const [key, value] of Object.entries(instance)) {
		// 	for (const [k, v] of Object.entries(value.team)) {
		// 		changes.forEach((change) => {
		// 			if (value.id === change.id) {
		// 				monster.stats.hp = change.stats.hp;
		// 			}
		// 		});
		// 	}
		// }

		return instance;
	};

	// action a refaire
	const _doAction = (instance, monsterID) => {
		const monstersChanges = [];
		const action = _getActionByMonsterID(instance, monsterID);

		monstersChanges.push(_doCalculChanges(instance, action));
		console.log("monstersChanges");
		console.log(monstersChanges);
		return monstersChanges;
	};

	const _getMonsterByID = (instance, monsterID) => {
		for (const [key, value] of Object.entries(instance)) {
			if (value.team.some((monster) => monster.id === monsterID)) {
				return value.team.filter((monster) => monster.id === monsterID)[0];
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

		const hpChanges =
			-(
				(monsterSource.stats.attack * skill.degat) / // source
				(monsterTarget.stats.def * 0.5)
			) * // target
			(typeEfficiency * isSTAB); // multiplying factor
		monsterTarget.stats.hp += hpChanges;
		return monsterTarget;
	};

	/**
	 * return 1.25 if true else return 1
	 */
	const _isSTAB = (monsterType, skillType) => {
		return 1;
	};

	const _getTypeEfficiency = (sourceType, targetType) => {
		return 1;
	};

	return { ready, waitActions };
};

export default fight;
