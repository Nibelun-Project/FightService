import { actionInterface, targetType }          from "../interfaces/fight";
import { monsterType } from "./monster";
import { SkillInterface }           from "./skill";

enum historyContextEnum {
    SPEEDCONTEST = "speedContest",
    PLAYROUND    = "playRound",
    DAMAGE       = "damage",
    KILL         = "kill",
    SWAP         = "swap",
    ENDGAME      = "endgame"
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
    monster?:        MonsterHistoryInterface
    targetMonster?:  MonsterHistoryInterface,
    action?:         historyActionInterface,
    skill?:          historySkillInterface,
    typeEfficiency?: number,
    isSTAB?:         number,
    statName?:       string,
    statChanges?:    number,
    isAvailableToPlayRound?: boolean,
    winner?:         string,
    monstersID?:     string[]
}

interface MonsterHistoryInterface {
	id: string;
	name: string;
	type: monsterType[];
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
    MonsterHistoryInterface,
    historySkillInterface,
    historyActionInterface
};