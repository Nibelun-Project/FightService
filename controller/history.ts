import { instanceInterface } from "../interfaces/fight";
import { fightInfoInterface, 
         historyContextEnum, 
         historyInterface } from "../interfaces/history.js";


const HISTORY_NAME = "fightInfo";
const initFightInfo = (): fightInfoInterface => {
    return { 
             round: 0,
             history: []
            };
}

const initHistoryRound = (instance: instanceInterface) => {
    instance[HISTORY_NAME].history[instance[HISTORY_NAME].round] = []
    instance[HISTORY_NAME].round++
}

const updateHistory = (instance: instanceInterface, update: historyInterface) => { 
    let fightInfo = instance[HISTORY_NAME];  
    if (update.context !== historyContextEnum.SPEEDCONTEST ||
        (fightInfo.history[fightInfo.round-1].every((event) => {             
            return ((event.content[0].monster.id !== update.content[0].monster.id  &&
                     event.content[1].monster.id !== update.content[0].monster.id) &&
                    (event.content[0].monster.id !== update.content[1].monster.id  &&
                     event.content[1].monster.id !== update.content[1].monster.id))
        })))fightInfo.history[fightInfo.round-1].push(update)
}


export {
    initFightInfo,
    initHistoryRound,
    updateHistory
}