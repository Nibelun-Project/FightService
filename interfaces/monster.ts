import { PassiveInterface } from "./passive.js";
import { SkillInterface } from "./skill.js";
import { statusInterface } from "./status.js";

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

enum typeConst {
	STAB = 1.5
}

const affinities = {
	fire : { fire: 1, mental: 1, neutral: 1 },
	mental : { fire: 1, mental: 1, neutral: 2 },
	neutral : { fire: 1, mental: 1, neutral: 0.5 },
};

type monsterType = `${monsterTypeEnum}`;

enum monsterStatsEnum {
	ATK = "attack",
	BALANCE = "balance",
	DEF = "def",
	HP = "hp",
	SPEED = "speed",
	STAMINA = "stamina",
}

type monsterStat = `${monsterStatsEnum}`;

enum statsConst {
	STAMINAREFILLONBOARD = 10,
	STAMINAREFILLNOTONBOARD = 15
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

export {
	MonsterInfoInterface,
	MonsterInterface,
	MonsterSpeedInterface,
	MonsterFightingInterface,
	monsterType,
	monsterTypeEnum,
	monsterStat,
	monsterStatsEnum,
	statsConst,
	typeConst,
	affinities
};
