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

const fight = () => {
	let instance = [];
	let teams = [];

	const ready = (team) => {
		// launchFight();
		teams.push(team);
		if (teams.length >= 2) return _startCombat();
	};

	const _startCombat = () => {
		return teams;
	};

	return { ready };
};

// export { launchFight };
export default fight;
