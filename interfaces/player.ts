import { MonsterFightingInterface } from "./monster";
import { actionInterface } from "./action";

interface playerFightingInterface {
	id: string;
	onBoard?: MonsterFightingInterface[];
	team?: MonsterFightingInterface[];
	actions?: actionInterface[];
}

export {
	playerFightingInterface,
};
