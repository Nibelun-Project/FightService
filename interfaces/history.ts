import { actionInterface }          from "../interfaces/fight";
import { MonsterFightingInterface } from "./monster";
import { SkillInterface }           from "./skill";

enum historyContextEnum {
    SPEEDCONTEST = "speedContest",
    PLAYROUND    = "playRound",
    DAMAGE       = "damage",
    KILL         = "kill",
    SWAP         = "swap"
}

interface fightInfoInterface {
	round:   number,
	history: historyInterface[][]
}

interface historyInterface {
	context: `${historyContextEnum}`,
    content: historyContentInterface[] | historyContentInterface
}

interface historyContentInterface {
    monster:         MonsterFightingInterface
    targetMonster?:  MonsterFightingInterface
    action?:         actionInterface,
    skill?:          SkillInterface,
    typeEfficiency?: number,
    isSTAB?:         number,
    statName?:       string,
    statChanges?:    number,
    isAvailableToPlayRound?: boolean

}

export {
    fightInfoInterface,
    historyInterface,
    historyContextEnum
};