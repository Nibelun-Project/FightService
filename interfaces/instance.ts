import { playerFightingInterface } from "./player.js";
import { fightInfoInterface } from "./history.js";

interface instanceInterface {
  id: string;
  players: playerFightingInterface[];
  fightInfo: fightInfoInterface;
}

export { instanceInterface };
