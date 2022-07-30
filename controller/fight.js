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
	return [{ dd: "d" }, { ddd: "d545" }];
};

const fight = () => {
	let instance = [];
	let players = [];

	const ready = (match) => {
		match.map((player) => {
			player["team"] = getTeam(player.id);
		});

		return _startCombat(match);
	};

	const _startCombat = (match) => {
		players.push(match);
		return match;
	};

	return { ready };
};

export default fight;
