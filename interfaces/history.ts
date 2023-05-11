import { actionInterface }          from "../interfaces/fight";
import { MonsterFightingInterface } from "./monster";
import { SkillInterface }           from "./skill";


interface fightInfoInterface {
	round: number,
	history: historyInterface[][]
}

interface historyInterface {
    logOption: `${logOption}` //enumLogOption
	context:  `${historyContext}`,
    content: historyContentInterface[] | historyContentInterface
}

interface historyContentInterface {
    monster: MonsterFightingInterface
    targetMonster?: MonsterFightingInterface
    action?: actionInterface,
    skill?: SkillInterface,
    typeEfficiency?: number,
    isSTAB?: number,
    statName?: String,
    statChanges?: number,
    isAvailableToPlayRound?: boolean

}

enum historyContext {
    SPEEDCONTEST = "speedContest",
    PLAYROUND    = "playRound",
    DAMAGE       = "damage",
    KILL         = "kill",
    SWAP         = "swap"
}

enum logOption {
    LOGINFO         = "logInfo",
    LOGSPEEDCONTEST = "logSpeedContest"
}

export {
    fightInfoInterface,
    historyInterface,
};