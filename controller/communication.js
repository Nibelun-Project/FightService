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
			const { status, playersID } = matchmakingModule.addPlayer(playerID);
			if (status >= 2) {
				const [match, fightID] = fightModule.ready(playersID);
				return _socketTo(match, "combat-started", { match, fightID }, status);
			} else if (status >= 1)
				return _socketTo(playerID, "combat-pending", "", status);
			else return status;
		} else return 3;
	};

	const _playerInit = (playerID, socketID) => {
		if (playerID && socketID && !playerSockets[playerID]) {
			playerSockets[playerID] = socketID;
			return true;
		} else return false;
	};

	const actions = (actions, playerID, fightID) => {
		if (playerSockets[playerID]) {
			const { status, playerInfo } = fightModule.waitActions(
				actions,
				playerID,
				fightID
			);
			if (status >= 2)
				return _socketTo(playerInfo, "action-done", playerInfo, status);
			else if (status >= 1)
				return _socketTo(playerID, "action-pending", "", status);
			else return status;
		} else return 3;
	};

	const _socketTo = (target, emit, data, status) => {
		if (typeof target !== "object" && typeof target === "string")
			io.to(playerSockets[target], emit, data);
		else {
			for (const [key, value] of Object.entries(target)) {
				io.to(playerSockets[key]).emit(emit, data);
			}
		}
		return status;
	};

	return { init, actions };
};

export { comm };
