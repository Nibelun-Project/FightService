import { playerFightingInterface } from "../interfaces/fight";

const matchmaking = () => {
	let waitingPlayers = [];

	const addPlayer = (player) => {
		waitingPlayers.push(player);
		if (waitingPlayers.length >= 2)
			return { status: 2, matchIDs: getPlayers() };
		return { status: 1 };
	};

	const getPlayers = () => {
		let players: playerFightingInterface[] = [] as any;
		waitingPlayers.forEach((idPlayer) => {
			players.push({ id: idPlayer });
		});

		waitingPlayers = [];
		return players;
	};

	return { addPlayer };
};

export default matchmaking;
