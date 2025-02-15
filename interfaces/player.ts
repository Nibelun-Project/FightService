import { MonsterFightingInterface } from "./monster.js";
import { actionInterface } from "./action.js";

interface playerFightingInterface {
  id: string;
  onBoard?: MonsterFightingInterface[];
  team?: MonsterFightingInterface[];
  actions?: actionInterface[];
}

export { playerFightingInterface };
