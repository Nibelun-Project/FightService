import { playerFightingInterface } from "../interfaces/fight";

const matchmaking = () => {
	let waitingPlayers = [];

	const addPlayer = (player) => {
		waitingPlayers.push(player);
		if (waitingPlayers.length >= 2)
			return { status: 2, matchIDs: createMatch() };
		return { status: 1 };
	};

	const createMatch = () => {
		let match: [playerFightingInterface];
		waitingPlayers.forEach((idPlayer) => {
			match.push({ id: idPlayer });
		});

		waitingPlayers = [];
		return match;
	};

	return { addPlayer };
};

export default matchmaking;
