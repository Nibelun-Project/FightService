import fight from "./fight.js";
import matchmaking from "./matchmaking.js";

const matchmake = matchmaking();
const fightmode = fight();

const comm = (io) => {
	const playerSockets = {};

	io.on("connection", (socket) => {
		console.log("user connected!");

		socket.on("init", (playerID) => {
			playerInit(playerID, socket.id);
			const match = matchmake.addPlayer(playerID);
			if (match) {
				const playerInfo = fightmode.ready(match);
				playerInfo.forEach((player) => {
					io.to(playerSockets[player.id]).emit("gongue", player);
				});
			} else socket.emit("matchmaking-pending");
		});
	});

	const playerInit = (playerID, socketID) => {
		if (playerID && socketID) playerSockets[playerID.toString()] = socketID;
	};
};

export { comm };
