import { MonsterFightingInterface } from "./monster";
import { SkillInterface } from "./skill";
import { fightInfoInterface } from "./history"

enum effectTypeEnum {
	BALANCE = "balance",
	DAMAGE = "damage",
	HEAL = "heal",
	MATTACK = "+attack",
	PATTACK = "+attack",
	POISON = "poison",
	SWAP = "swap"
}

enum targetTypeEnum {
	ALL = "all",
	ALLIES = "allies",
	ALLY = "ally",
	DOUBLE = "double",
	ENNEMIES = "ennemies",
	SELF = "self",
	SINGLE = "single"
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
	fightInfo: fightInfoInterface;
}

export {
	targetTypeEnum,
	effectTypeEnum,
	actionInterface,
	playerFightingInterface,
	instanceInterface,
	targetInfoType, targetType, effectType
};
