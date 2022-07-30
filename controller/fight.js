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
			id: "1",
			name: "ronkarétoal",
			typeName: {
				firstType: "fire",
				secondType: "mental",
			},
			stats: {
				hp: 100,
				attack: 100,
				def: 100,
				speed: 100,
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
			id: "2",
			name: "étoalronkaré",
			typeName: {
				firstType: "fire",
				secondType: "mental",
			},
			stats: {
				hp: 100,
				attack: 100,
				def: 100,
				speed: 100,
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
		match.map((player) => {
			player["team"] = getTeam(player.id);
			player["actions"] = [];
		});

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
		let playerActions = 0;
		const tempInstance = instance[fightID];
		if (!tempInstance) return null;
		const tempTeamArray = tempInstance.filter(
			(player) => player.id == playerID
		);
		if (tempTeamArray.length < 0) return null;
		const tempPlayer = tempTeamArray[0];
		tempPlayer.actions = actions;
		tempInstance.forEach((player) => {
			if (player.actions.length > 0) playerActions++;
		});

		if (playerActions >= 2) return _doActions(tempInstance); //action
		else return null;
	};

	const _doActions = (instance) => {
		console.log(instance);

		return instance;
	};

	return { ready, waitActions };
};

export default fight;
