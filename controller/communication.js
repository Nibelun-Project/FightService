import fight from "./fight.js";
import matchmaking from "./matchmaking.js";

const matchmakingModule = matchmaking();
const fightModule = fight();

const comm = (io) => {
	const playerSockets = {};

	io.on("connection", (socket) => {
		console.log("user connected!");

		socket.on("init", (playerID) => {
			playerInit(playerID, socket.id);
			const playersID = matchmakingModule.addPlayer(playerID);
			if (playersID) {
				const [match, fightID] = fightModule.ready(playersID);
				_socketTo(match, "combat-started", { match, fightID });
			} else socket.emit("combat-pending");
		});

		socket.on("actions", (actions, playerID, fightID) => {
			const playerInfo = fightModule.waitActions(actions, playerID, fightID);
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

	const _socketTo = (match, emit, data) => {
		for (const [key, value] of Object.entries(match)) {
			console.log(playerSockets[key]);
			console.log(emit);
			io.to(playerSockets[key]).emit(emit, data);
		}
	};
};

export { comm };
