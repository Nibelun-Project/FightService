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
			const playerInfo = fightmode.waitActions(actions, playerID, fightID);
			if (playerInfo) _socketTo(playerInfo, "action-done", playerInfo);
			else socket.emit("action-pending");
		});

		socket.on("disconnect", () => {
			let keyToDelete;
			for (const [key, value] of Object.entries(playerSockets)) {
				if (value === socket.id) keyToDelete = key;
			}
			if (keyToDelete) delete playerSockets[keyToDelete];
		});
	});

	const playerInit = (playerID, socketID) => {
		if (playerID && socketID) playerSockets[playerID.toString()] = socketID;
	};

	const _socketTo = (playerInfo, emit, data) => {
		for (const [key, value] of Object.entries(playerInfo)) {
			io.to(playerSockets[key]).emit(emit, data);
		}
	};
};

export { comm };
