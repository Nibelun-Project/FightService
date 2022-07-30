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
				const [playerInfo, fightID] = fightmode.ready(match);
				_socketTo(playerInfo, "gongue", { playerInfo, fightID });
			} else socket.emit("matchmaking-pending");
		});

		socket.on("actions", (actions, playerID, fightID) => {
			const [playerInfo] = fightmode.waitActions(actions, playerID, fightID);
			if (res) _socketTo(playerInfo, "action-done", playerInfo);
			else socket.emit("action-pending");
		});
	});

	const playerInit = (playerID, socketID) => {
		if (playerID && socketID) playerSockets[playerID.toString()] = socketID;
	};

	const _socketTo = (playerInfo, emit, data) => {
		playerInfo.forEach((player) => {
			io.to(playerSockets[player.id]).emit(emit, data);
		});
	};
};

export { comm };
