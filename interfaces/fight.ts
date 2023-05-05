import { MonsterFightingInterface } from "./monster";
import { SkillInterface } from "./skill";

// interface instanceInterface {
// 	[player: string]: playerFightingInterface[];
// }

interface actionInterface {
	sourceID: string;
	targetInfo: { id: string } | { targetedPlayedID: string; spot: number };
	skill: SkillInterface;
}

interface playerFightingInterface {
	id: string;
	onBoard?: MonsterFightingInterface[];
	team?: MonsterFightingInterface[];
	actions?: actionInterface[];
}

interface instanceInterface {
	id: string;
	players: playerFightingInterface[];
	history: [];
}

enum targetTypeEnum {
	SINGLE = "single",
	DOUBLE = "double",
	ALLY = "ally",
	ALLIES = "allies",
	ENNEMIES = "ennemies",
	ALL = "all",
	SELF = "self",
}

enum effectTypeEnum {
	DAMAGE = "damage",
	BALANCE = "balance",
	HEAL = "heal",
	SWAP = "swap",
	PATTACK = "+attack",
	MATTACK = "+attack",
}

export {
	targetTypeEnum,
	effectTypeEnum,
	actionInterface,
	playerFightingInterface,
	instanceInterface,
};
