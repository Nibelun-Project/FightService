import {
	instanceInterface,
} from "../interfaces/fight";
import { historyInterface, fightInfoInterface } from "../interfaces/history"


const HISTORY_NAME = "fightInfo";
const enumContext = {
    SPEEDCONTEST : "speedContest",
    PLAYROUND    : "playRound",
    DAMAGE       : "damage"

};
const enumLogOption = {
    LOGINFO: "logInfo",
    LOGSPEEDCONTEST: "logSpeedContest"
}
const initFightInfo = (): fightInfoInterface => {
    return { 
             round: 0,
             history: []
            };
}

const initRound = (instance: instanceInterface) => {
    instance[HISTORY_NAME].history[instance[HISTORY_NAME].round] = []
    instance[HISTORY_NAME].round++
}

const updateHistory = (instance: instanceInterface, update: historyInterface) => {      
    _updatesContexts(instance, update)[update.logOption]()
}

const _updatesContexts = (instance: instanceInterface, update: historyInterface) => {
    let fightInfo = instance[HISTORY_NAME];  

    const logSpeedContest = () => {               
        if (fightInfo.history[fightInfo.round-1].every((event) => {             
            return ((event.content[0].monster.id !== update.content[0].monster.id  &&
                     event.content[1].monster.id !== update.content[0].monster.id) &&
                    (event.content[0].monster.id !== update.content[1].monster.id  &&
                     event.content[1].monster.id !== update.content[1].monster.id))
        })) {fightInfo.history[fightInfo.round-1].push(update)}
    }

    const logInfo = () => {
        fightInfo.history[fightInfo.round-1].push(update)
    }

    return {logSpeedContest, logInfo}
}






export {
    HISTORY_NAME,
    enumContext,
    initFightInfo,
    initRound,
    updateHistory
}