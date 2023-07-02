import { actionInterface } from "../interfaces/action.js";
import { fightInfoInterface, 
         historyActionInterface, 
         historyContextEnum, 
         historyInterface, 
         historyMonsterInterface, 
         historySkillInterface} from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { MonsterFightingInterface } from "../interfaces/monster";
import { SkillInterface } from "../interfaces/skill";


const HISTORY_NAME = "fightInfo";
const initFightInfo = (): fightInfoInterface => {
    return { 
             round: 0,
             history: [],
             endgame: false
            };
}

const initHistoryRound = (instance: instanceInterface) => {
    instance[HISTORY_NAME].history[instance[HISTORY_NAME].round] = []
    instance[HISTORY_NAME].round++
}

const convertMonsterToHistory = (monster: MonsterFightingInterface): historyMonsterInterface => {
    return {
        id: monster.id,
        name: monster.name,
        type: monster.type,
        playerID: monster.playerID,
    }
}

const convertSkillToHistory = (skill: SkillInterface): historySkillInterface => {
    return {
        name: skill.name,
	    type: skill.type,
	    targetType: skill.targetType
    }
}

const convertActionToHistory = (action: actionInterface): historyActionInterface => {
    return {
        sourceID: action.sourceID,
        skill: convertSkillToHistory(action.skill)
    }
}

const updateHistory = (instance: instanceInterface, update: historyInterface) => { 
    let fightInfo = instance[HISTORY_NAME];      
    if (update.context !== historyContextEnum.SPEEDCONTEST ||
        (fightInfo.history[fightInfo.round-1].every((event) => {             
            return !((event.content.monstersID[0] === update.content.monstersID[0]  ||
                      event.content.monstersID[1] === update.content.monstersID[0]) &&
                     (event.content.monstersID[0] === update.content.monstersID[1]  ||
                      event.content.monstersID[1] === update.content.monstersID[1]))
        })))fightInfo.history[fightInfo.round-1].push(update)
}

export {
    initFightInfo,
    initHistoryRound,
    updateHistory,
    convertMonsterToHistory,
    convertSkillToHistory,
    convertActionToHistory
}