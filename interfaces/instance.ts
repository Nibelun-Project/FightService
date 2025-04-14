import { playerFighting } from "./player.js";
import { fightInfoInterface } from "./history.js";

interface instanceInterface {
	id: string;
	players: playerFighting[];
	fightInfo: fightInfoInterface;
}

export { instanceInterface };
