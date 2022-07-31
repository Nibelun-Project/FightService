let mapFights = {};

const getMapFight = () => {
	return mapFights;
};

const setMapFightById = (fightId, playersInfo) => {
	mapFights[fightId.toString()] = playersInfo;
};

const getNewFightId = () => {
	return "fid_" + Date.now().toString();
};

const launchFight = (playersInfo) => {
	const fightId = getNewFightId();
	setMapFightById(fightId, playersInfo);
	console.log("fight n°", fightId, "started");
	console.log(getMapFight());
	return { id: fightId };
};

const getTeam = (playerID) => {
	return [
		{
			id: (parseInt(playerID)/100000)*1,
			name: "ronkarétoal",
			typeName: {
				firstType: "fire",
				secondType: "mental",
			},
			stats: {
				hp: 100,
				attack: 100,
				def: 100,
				speed: (parseInt(playerID)/100000)*50,
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
			id: (parseInt(playerID)/100000)*2,
			name: "étoalronkaré",
			typeName: {
				firstType: "fire",
				secondType: "mental",
			},
			stats: {
				hp: 100,
				attack: 100,
				def: 100,
				speed: 100,//(parseInt(playerID)/100000)*100,
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
	let instance = {};

	const ready = (match) => {
		for (const [key, value] of Object.entries(match)) {
			value["team"] = getTeam(key)
			value["actions"] = []
		}
		return _startCombat(match);
	};

	const _getNewFightId = () => {
		return "fid_" + Date.now().toString();
	};

	const _startCombat = (match) => {
		const fightId = _getNewFightId();
		instance[fightId.toString()] = match;
		return [match, fightId];
	};

	const waitActions = (actions, playerID, fightID) => {
		const tempInstance = instance[fightID];
		if (!tempInstance) return null;
		tempInstance[playerID].actions = actions

		if (_isActionsFilled(tempInstance)) {
			const modifyInstance = _doActions(tempInstance)
			instance[fightID] = modifyInstance;
			return modifyInstance
		}
		else return null;
	};

	const _isActionsFilled = (tempInstance) => {
		for (const [key, value] of Object.entries(tempInstance)) {
			if (value.actions.length === 0) return false
		}
		return true
	}

	const _doActions = (instance) => {
		console.log(instance);
		//speed contest
		const sortedMonsters = _speedContest(instance)
		//do actions
		//clear actions
		for (const [key, value] of Object.entries(instance)) {
			value.actions = []
		}

		//send info
		return instance;
	};

	const _speedContest = (instance) => {
		let sortedMonsters = []
		let tempMonstersList = []
		for (const [key, value] of Object.entries(instance)) {
			value.team.forEach(monster => {
				monster.playerID = key
			})
			tempMonstersList = tempMonstersList.concat(value.team)
		}
		tempMonstersList.forEach(tempMonster => {
			const count = tempMonstersList.filter(monster => {
				if (monster.stats.speed > tempMonster.stats.speed || monster.stats.speed === tempMonster.stats.speed && monster.id > tempMonster.id) return true;
				return false;
			  }).length;
			  sortedMonsters[count] = tempMonster
		})

		return sortedMonsters
	}

	return { ready, waitActions };
};

export default fight;
