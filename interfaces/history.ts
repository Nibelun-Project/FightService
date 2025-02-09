import { targetType } from "./action.js";
import { monsterType } from "./monster.js";

enum historyContextEnum {
    DAMAGE       = "damage",
    ENDGAME      = "endgame",
    HEAL         = "heal",
    KILL         = "kill",
    PLAYROUND    = "playRound",
    SPEEDCONTEST = "speedContest",
    STATUS       = "status",
    SWAP         = "swap",
}

interface fightInfoInterface {
	round:   number,
	history: historyInterface[][]
    endgame: boolean,
    winner?: string
}

interface historyInterface {
	context: `${historyContextEnum}`,
    content: historyContentInterface
}

interface historyContentInterface {
    monster?:        historyMonsterInterface
    targetMonster?:  historyMonsterInterface,
    action?:         historyActionInterface,
    skill?:          historySkillInterface,
    typeEfficiency?: number,
    isSTAB?:         number,
    statName?:       string,
    statChanges?:    number,
    isAvailableToPlayRound?: boolean,
    winner?:         string,
    monstersID?:     string[],
    statusName?:     string,
    nbrRound?:       number
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
	skill: historySkillInterface
}

export {
    fightInfoInterface,
    historyInterface,
    historyContextEnum,
    historyMonsterInterface,
    historySkillInterface,
    historyActionInterface
};