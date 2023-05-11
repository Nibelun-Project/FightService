import { actionInterface } from "./fight";
import { PassiveInterface } from "./passive";
import { SkillInterface } from "./skill";

enum monsterTypeEnum {
	FIRE = "fire",
	PLANT = "plant",
	WATER = "water",
	NEUTRAL = "neutral",
	MARTIAL = "martial",
	MENTAL = "mental",
	POISON = "poison",
	AERIAL = "aerial",
	VOLT = "volt",
	ROCK = "rock",
	GHOST = "ghost",
	SPATIAL = "spatial",
}

enum monsterStatsEnum {
	HP = "hp",
	DEF = "def",
	ATK = "attack",
	SPEED = "speed",
	STAMINA = "stamina",
	BALANCE = "balance"
}

interface MonsterInfoInterface {
	name: string;
	type: monsterType[];
	stats: {
		hp: number;
		attack: number;
		def: number;
		speed: number;
		stamina: number;
		balance: number;
	};
	image: string;
	passive: string[];
	trait: string;
	skills: string[];
}

interface MonsterInterface {
	name: string;
	type: monsterType[];
	stats: {
		hp: number;
		attack: number;
		def: number;
		speed: number;
		stamina: number;
		balance: number;
	};
	image: string;
	passive: {};
	trait: string;
	skills: SkillInterface[];
}

interface MonsterSpeedInterface {
	shuffleID: number,
	monster: MonsterFightingInterface,
	action?: SkillInterface
}

interface MonsterFightingInterface {
	id: string;
	name: string;
	type: monsterType[];
	isAlive: boolean;
	stats: {
		hp: number;
		attack: number;
		def: number;
		speed: number;
		stamina: number;
		balance: number;
	};
	starting: {
		hp: number;
		attack: number;
		def: number;
		speed: number;
		stamina: number;
		balance: number;
	};
	image: string;
	passive: PassiveInterface;
	skills: SkillInterface[];
	playerID: string;
}

type monsterType = `${monsterTypeEnum}`;

export {
	MonsterInfoInterface,
	MonsterInterface,
	MonsterSpeedInterface,
	MonsterFightingInterface,
	monsterType,
	monsterTypeEnum,
	monsterStatsEnum
};
