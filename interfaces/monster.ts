import { FightInfo, historyContextEnum } from "./history.js";
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
	STAB = 1.5,
}

const affinities = {
	fire: { fire: 1, mental: 1, neutral: 1 },
	mental: { fire: 1, mental: 1, neutral: 2 },
	neutral: { fire: 1, mental: 1, neutral: 0.5 },
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

type monsterStatName = `${monsterStatsEnum}`;
interface monsterStat {
	hp: number;
	attack: number;
	def: number;
	speed: number;
	stamina: number;
	balance: number;
}

enum statsConst {
	STAMINAREFILLONBOARD = 10,
	STAMINAREFILLNOTONBOARD = 15,
}

interface MonsterSpeedInterface {
	shuffleID: number;
	monster: MonsterFighting;
	action?: SkillInterface;
}

interface Monster {
	id: string;
	name: string;
	type: monsterType[];
	stats: monsterStat;
	image: string;
	passive: PassiveInterface;
	skills: SkillInterface[];
	playerID: string;
}

class MonsterFighting implements Monster {
	private _id: string = "";
	name: string = "";
	type: monsterType[] = [];
	private _isAlive: boolean = true;
	stats: monsterStat = {} as monsterStat;
	starting: monsterStat = {} as monsterStat;
	statuses: statusInterface[] = [];
	image: string = "";
	passive: PassiveInterface = {} as PassiveInterface;
	skills: SkillInterface[] = [];
	startSkills?: SkillInterface[] = [];
	playerID: string = "";

	constructor(monster: Monster) {
		this.id = monster.id;
		this.name = monster.name;
		this.type = monster.type;
		this._isAlive = true;
		this.stats = monster.stats;
		this.starting = monster.stats;
		this.statuses = [];
		this.image = monster.image;
		this.passive = monster.passive;
		this.skills = monster.skills;
		this.startSkills = monster.skills;
		this.playerID = monster.playerID;
	}

	public get id(): string {
		return this._id;
	}
	private set id(id: string) {
		this._id = id;
	}

	public get isAlive(): boolean {
		if (this === undefined || !this._isAlive) {
			return false;
		}
		return true;
	}
	public set isAlive(isAlive: boolean) {
		this._isAlive = isAlive;
	}

	isTargetable = (): boolean => {
		return !this.isAlive;
	};

	checkDeath = (fightInfo: FightInfo) => {
		if (this.stats.hp <= 0) {
			this.killMonster(fightInfo);
			return true;
		}
		return false;
	};

	private killMonster = (fightInfo: FightInfo) => {
		if (this.isAlive)
			fightInfo.updateHistory({
				context: historyContextEnum.KILL,
				content: {
					monster: fightInfo.convertMonsterToHistory(this),
				},
			});
		this.stats.hp = 0;
		this.isAlive = false;
	};
}

export {
	MonsterSpeedInterface,
	MonsterFighting,
	monsterType,
	monsterTypeEnum,
	monsterStatName,
	monsterStatsEnum,
	statsConst,
	typeConst,
	affinities,
};
