import { PassiveInterface } from "./passive";
import { SkillInterface } from "./skill";
import { statusInterface } from "./status";

enum monsterTypeEnum {
	AERIAL = "aerial",
	FIRE = "fire",
	GHOST = "ghost",
	MARTIAL = "martial",
	MENTAL = "mental",
	NEUTRAL = "neutral",
	PLANT = "plant",
	POISON = "poison",
	ROCK = "rock",
	SPATIAL = "spatial",
	VOLT = "volt",
	WATER = "water",
}


enum monsterStatsEnum {
	ATK = "attack",
	BALANCE = "balance",
	DEF = "def",
	HP = "hp",
	SPEED = "speed",
	STAMINA = "stamina",
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
	statuses: statusInterface[];
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
