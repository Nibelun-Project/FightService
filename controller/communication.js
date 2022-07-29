import fight from "./fight";
import { Socket } from "socket.io";
import { io } from "socket.io";
const comm = () => {
	const players = [];

	const playerReady = (playerID, socketID) => {
		if (playerID && socketID) players.push({ playerID, socketID });
	};
};
