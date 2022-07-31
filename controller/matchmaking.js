const matchmaking = () => {
	let waitingPlayers = [];

	const addPlayer = (player) => {
		waitingPlayers.push(player);
		if (waitingPlayers.length >= 2) return createMatch();
		return null;
	};

	const createMatch = () => {
		const match = [{ id: waitingPlayers[0] }, { id: waitingPlayers[1] }];

		waitingPlayers = waitingPlayers.filter(
			(player) => player != waitingPlayers[1] && waitingPlayers[0]
		);
		return match;
	};

	return { addPlayer };
};

export default matchmaking;
