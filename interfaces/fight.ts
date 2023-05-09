import { MonsterFightingInterface } from "./monster";
import { SkillInterface } from "./skill";

enum effectTypeEnum {
	DAMAGE = "damage",
	BALANCE = "balance",
	HEAL = "heal",
	SWAP = "swap",
	PATTACK = "+attack",
	MATTACK = "+attack",
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

type targetType = `${targetTypeEnum}`
type effectType = `${effectTypeEnum}`

interface actionInterface {
	sourceID: string;
	targetInfo: targetInfoType
	skill: SkillInterface;
}

interface targetInfo { }
interface targetInfoPlayerID extends targetInfo {
	targetedPlayerID: string;
	spot: number;
	id?: never;
}
interface targetInfoID extends targetInfo {
	targetedPlayerID?: never;
	spot?: never;
	id: string;
}

type targetInfoType = targetInfoPlayerID | targetInfoID;

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

export {
	targetTypeEnum,
	effectTypeEnum,
	actionInterface,
	playerFightingInterface,
	instanceInterface,
	targetInfoType, targetType, effectType
};
