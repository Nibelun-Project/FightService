import { playerFightingInterface } from "./player";
import { fightInfoInterface } from "./history";

interface instanceInterface {
	id: string;
	players: playerFightingInterface[];
	fightInfo: fightInfoInterface;
}

export {
    instanceInterface
}