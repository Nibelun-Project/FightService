import fight from "./fight.js";
import matchmaking from "./matchmaking.js";

const matchmakingModule = matchmaking();
const fightModule = fight();

const comm = (io) => {
	const playerSockets = {};

	io.on("connection", (socket) => {
		console.log("user connected!");

		socket.on("disconnect", () => {
			//send the disconnected player to "fight" to prevent the other player that he won and the opponent has disconnected
			let keyToDelete;
			for (const [key, value] of Object.entries(playerSockets)) {
				if (value === socket.id) keyToDelete = key;
			}
			if (keyToDelete) delete playerSockets[keyToDelete];
		});
	});

	const init = (playerID, socketID) => {
		const initialized = _playerInit(playerID, socketID);
		if (initialized) {
			//change the return for "fight" && "matchmaking", 0 = error, 1 = 1-player, 2-player
			const playersID = matchmakingModule.addPlayer(playerID);
			if (playersID) {
				const [match, fightID] = fightModule.ready(playersID);
				return _socketTo(match, "combat-started", { match, fightID });
			} else return _socketTo(playerID, "combat-pending", "");
		} else return "already initialized";
	};

	const _playerInit = (playerID, socketID) => {
		if (playerID && socketID && !playerSockets[playerID]) {
			playerSockets[playerID] = socketID;
			return true;
		} else return false;
	};

	const actions = (actions, playerID, fightID) => {
		//change the return for "fight" && "matchmaking", 0 = error, 1 = 1-player, 2-player
		if (playerSockets[playerID]) {
			const playerInfo = fightModule.waitActions(actions, playerID, fightID);
			if (playerInfo) return _socketTo(playerInfo, "action-done", playerInfo);
			else return _socketTo(playerID, "action-pending", "");
		} else return "player is not in combat";
	};

	const _socketTo = (target, emit, data) => {
		if (typeof target !== "object" && typeof target === "string")
			io.to(playerSockets[target], emit, data);
		else {
			for (const [key, value] of Object.entries(target)) {
				io.to(playerSockets[key]).emit(emit, data);
			}
		}
		return "message sent trough sockets";
	};

	return { init, actions };
};

export { comm };
