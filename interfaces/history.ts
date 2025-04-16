import { actionInterface, targetType } from "./action.js";
import { MonsterFighting, monsterType } from "./monster.js";
import { SkillInterface } from "./skill.js";

enum historyContextEnum {
	DAMAGE = "damage",
	ENDGAME = "endgame",
	HEAL = "heal",
	KILL = "kill",
	PLAYROUND = "playRound",
	PREVENT = "prevent",
	SPEEDCONTEST = "speedContest",
	STAMINA = "stamina",
	STATUS = "status",
	SWAP = "swap",
}

interface historyInterface {
	context: `${historyContextEnum}`;
	content: historyContentInterface;
}

interface historyContentInterface {
	monster?: historyMonsterInterface;
	targetMonster?: historyMonsterInterface;
	action?: historyActionInterface;
	skill?: historySkillInterface;
	typeEfficiency?: number;
	isSTAB?: number;
	statName?: string;
	statChanges?: number;
	isAvailableToPlayRound?: boolean;
	winner?: string;
	monstersID?: string[];
	statusName?: string;
	nbrRound?: number;
}

interface historyMonsterInterface {
	id: string;
	name: string;
	type: monsterType[];
	playerID: string;
}

interface historySkillInterface {
	name: string;
	type: monsterType;
	targetType: targetType;
}

interface historyActionInterface {
	sourceID: string;
	skill: historySkillInterface;
}

class FightInfo {
	round: number = -1;
	_history: historyInterface[][] = [];
	endgame: boolean = false;
	winner: string = "";

	constructor() {
		this.round = 0;
		this.history = [];
		this.endgame = false;
	}

	public get history(): historyInterface[][] {
		return this._history;
	}
	private set history(history: historyInterface[][]) {
		this._history = history;
	}

	initHistoryRound = () => {
		this.history[this.round] = [];
		this.round++;
	};

	updateHistory = (update: historyInterface) => {
		if (
			update.context !== historyContextEnum.SPEEDCONTEST ||
			this.history[this.round - 1].every((event) => {
				return !(
					(event.content.monstersID[0] ===
						update.content.monstersID[0] ||
						event.content.monstersID[1] ===
							update.content.monstersID[0]) &&
					(event.content.monstersID[0] ===
						update.content.monstersID[1] ||
						event.content.monstersID[1] ===
							update.content.monstersID[1])
				);
			})
		)
			this.history[this.round - 1].push(update);
	};

	convertMonsterToHistory = (
		monster: MonsterFighting,
	): historyMonsterInterface => {
		return {
			id: monster.id,
			name: monster.name,
			type: monster.type,
			playerID: monster.playerID,
		};
	};

	convertSkillToHistory = (skill: SkillInterface): historySkillInterface => {
		return {
			name: skill.name,
			type: skill.type,
			targetType: skill.targetType,
		};
	};

	convertActionToHistory = (
		action: actionInterface,
	): historyActionInterface => {
		return {
			sourceID: action.sourceID,
			skill: this.convertSkillToHistory(action.skill),
		};
	};
}

export {
	FightInfo,
	historyInterface,
	historyContextEnum,
	historyMonsterInterface,
	historySkillInterface,
	historyActionInterface,
};
