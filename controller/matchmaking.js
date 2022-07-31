const matchmaking = () => {
	let waitingPlayers = [];

	const addPlayer = (player) => {
		waitingPlayers.push(player);
		if (waitingPlayers.length >= 2) return createMatch();
		return null;
	};

	const createMatch = () => {
		const match = {}
		match[waitingPlayers[0].toString()] = {}
		match[waitingPlayers[1].toString()] = {}

		waitingPlayers = waitingPlayers.filter(
			(player) => player != waitingPlayers[1] && waitingPlayers[0]
		);
		return match;
	};

	return { addPlayer };
};

export default matchmaking;
