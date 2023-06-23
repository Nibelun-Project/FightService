import { actionInterface }          from "../interfaces/fight";
import { MonsterFightingInterface } from "./monster";
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
    content: historyContentInterface[] | historyContentInterface
}

interface historyContentInterface {
    monster?:         MonsterFightingInterface
    targetMonster?:  MonsterFightingInterface
    action?:         actionInterface,
    skill?:          SkillInterface,
    typeEfficiency?: number,
    isSTAB?:         number,
    statName?:       string,
    statChanges?:    number,
    isAvailableToPlayRound?: boolean,
    winner?:         string
}

export {
    fightInfoInterface,
    historyInterface,
    historyContextEnum
};