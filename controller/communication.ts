import { instanceInterface, playerFightingInterface } from "../interfaces/fight.js";
import fight from "./fight.js";
import matchmaking from "./matchmaking.js";

const matchmakingModule = matchmaking();
const fightModule = fight();

//create a return handler that is a function where you send the status and the data from the controllers
//try enhancing _socketTo to handle returns better

const comm = (io) => {
	const playerSockets = {};

	io.on("connection", (socket) => {
		console.log("user connected!");
		socket.on("disconnect", () => {
			//send the disconnected player to "fight" to inform the other player that he won and that the opponent has disconnected
			//remove the match from matchFight
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
			const { status, matchIDs } = matchmakingModule.addPlayer(playerID);
			if (status >= 2) {
				const instance: instanceInterface = fightModule.ready(matchIDs);
				return _socketTo(instance, "combat-started", instance, status);
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
			const { status, matchInfo } = fightModule.waitActions(
				actions,
				playerID,
				fightID
			);
			if (status === 2)
				return _socketTo(matchInfo, "action-done", matchInfo, status);
			else if (status === 1)
				return _socketTo(playerID, "action-pending", "", status);
			else if (status === 4) {
				console.log("status 4");

				return _socketTo(matchInfo, "endgame", matchInfo, 2)
			}
			else return status;
		} else return 3;
	};

	const swapActions = (swapActions, playerID, fightID, both: boolean) => {
		if (playerSockets[playerID]) {
			const { status, matchInfo } = fightModule.doSwap(
				swapActions,
				fightID,
				playerID,
				both
			);
			if (status >= 2)
				return _socketTo(matchInfo, "swap-done", matchInfo, status);
			else if (status >= 1)
				return _socketTo(playerID, "swap-pending", "", status);
			else return status;
		} else return 3;
	};

	const _socketTo = (target, emit, data, status) => {
		if (typeof target !== "object" && typeof target === "string")
			io.to(playerSockets[target], emit, data);
		else {
			target.players.forEach((player: playerFightingInterface) => {
				io.to(playerSockets[player.id]).emit(emit, data);
			})
		}
		return status;
	};

	return { init, actions, swapActions };
};

export { comm };
