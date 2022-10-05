const matchmaking = () => {
	let waitingPlayers = [];

	const addPlayer = (player) => {
		waitingPlayers.push(player);
		if (waitingPlayers.length >= 2)
			return { status: 2, matchIDs: createMatch() };
		return { status: 1 };
	};

	const createMatch = () => {
		const match = {};
		match[waitingPlayers[0].toString()] = {};
		match[waitingPlayers[1].toString()] = {};

		waitingPlayers = [];
		return match;
	};

	return { addPlayer };
};

export default matchmaking;
