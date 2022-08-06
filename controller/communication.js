import fight from "./fight.js";
import matchmaking from "./matchmaking.js";

const matchmakingModule = matchmaking();
const fightModule = fight();

const comm = (io) => {
	const playerSockets = {};

	io.on("connection", (socket) => {
		console.log("user connected!");

		socket.on("disconnect", () => {
			let keyToDelete;
			for (const [key, value] of Object.entries(playerSockets)) {
				if (value === socket.id) keyToDelete = key;
			}
			if (keyToDelete) delete playerSockets[keyToDelete];
		});
	});

	const init = (playerID, socketID) => {
		_playerInit(playerID, socketID);
		const playersID = matchmakingModule.addPlayer(playerID);
		console.log(playersID);
		if (playersID) {
			const [match, fightID] = fightModule.ready(playersID);
			return _socketTo(match, "combat-started", { match, fightID });
		} else return _socketTo(playerID, "combat-pending", "");
	};

	const _playerInit = (playerID, socketID) => {
		if (playerID && socketID) playerSockets[playerID.toString()] = socketID;
	};

	const actions = (actions, playerID, fightID) => {
		const playerInfo = fightModule.waitActions(actions, playerID, fightID);
		if (playerInfo) _socketTo(playerInfo, "action-done", playerInfo);
		else _socketTo(playerID, "action-pending", "");
	};

	const _socketTo = (target, emit, data) => {
		if (typeof target !== "object" && typeof target === "string")
			io.to(playerSockets[target].emit(emit, data));
		else {
			for (const [key, value] of Object.entries(target)) {
				console.log(playerSockets[key]);
				console.log(emit);
				io.to(playerSockets[key]).emit(emit, data);
			}
		}
		return "message sent trough sockets";
	};

	return { init, actions };
};

export { comm };
