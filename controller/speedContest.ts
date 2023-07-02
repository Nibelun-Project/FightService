import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { MonsterFightingInterface, MonsterSpeedInterface, monsterStatsEnum } from "../interfaces/monster.js";
import { updateHistory } from "./history.js";
import { getActionByMonsterID } from "./instance.js";

const speedContest = (instance: instanceInterface): string[] => {
    //1 - Prepare array of monster to proceed the speed constest with all needly informations
    let tempMonstersList = [];
    tempMonstersList = _prepareMonstersToSpeedContest(instance);

    return _getPlacesOnRound(tempMonstersList, instance);
};


const _prepareMonstersToSpeedContest = (instance: instanceInterface): MonsterSpeedInterface[] => {
    //1 - set an array with all the monsters on the board
    let tempMonstersList = [];
    instance.players.forEach((player) => {
        tempMonstersList = tempMonstersList.concat(player.onBoard)
    });

    //2 - add for each monster a random id
    tempMonstersList = _shuffleMonsters(tempMonstersList);

    //3 - add for each monster the action he's playing
    tempMonstersList.forEach((customMonster) => {
        customMonster.action = getActionByMonsterID(instance, customMonster.monster.id).skill;
    });

    return tempMonstersList;
};

const _shuffleMonsters = (tempMonstersList: MonsterFightingInterface[]): MonsterSpeedInterface[] => {
    //1 - create array of "n°", look like: [1, 2, 3, 4]
    const shuffleIndicators: number[] = [];
    for (let i = 1; i <= tempMonstersList.length; i++) {
        shuffleIndicators.push(i);
    }

    const _shuffleArray = (array: number[]): number[] => {
        const _reverseItem = (list: number[], id1: number, id2: number) => {
            const temp = list[id1];
            list[id1] = list[id2];
            list[id2] = temp;
        };

        //if the ally on the left get a lower priority switch with the ally
        const _allyPriority = (id1: number, id2: number) => {
            if (array[id1] > array[id2]) {
                _reverseItem(array, id1, id2);
            }
        };

        // 3 - for each n° switch it's possition with one other in the list
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            _reverseItem(array, i, j);
        }

        //4 - give the action priority to the ally on the left
        for (let l = 1; l <= array.length - 1; l++) {
            if (tempMonstersList[l - 1].playerID === tempMonstersList[l].playerID)
                _allyPriority(l - 1, l);
        }

        return array;
    };

    //2 - shuffle the list of "n°"
    _shuffleArray(shuffleIndicators);
    const monsterListWithShuffleID = [];

    /**
     * set an array of monster and an id used to randomize the speed contest when to monster get the same speed,
     * look like: [{monster, contestID}, {...}]
     */
    for (let index = 0; index < shuffleIndicators.length; index++) {
        monsterListWithShuffleID.push({
            shuffleID: shuffleIndicators[index],
            monster: tempMonstersList[index],
        });
    }
    return monsterListWithShuffleID;
};

/**
 * @param {*} speedContestTempsList array of monster and random id, look like: [{monster, contestID}, {...}]
 * @returns array of monsterID in the order they will play there turn.
 */
const _getPlacesOnRound = (speedContestTempsList: MonsterSpeedInterface[], instance: instanceInterface): string[] => {
    let sortedMonsters = [];
    //1 - For each monster
    speedContestTempsList.forEach((tempMonster) => {        
        //2 - Get the number of monster wich will play before, following conditions:
        const count = speedContestTempsList.filter((speedContest) => {
                      
            if (speedContest.monster.id != tempMonster.monster.id && //2.1 comparison between the same monster

                (speedContest.action.priority < tempMonster.action.priority || //2.2   - the action have a higher priority

                (tempMonster.action.priority === speedContest.action.priority && //2.3.1 - the action priotity is equal
                 speedContest.monster.stats[monsterStatsEnum.SPEED] > tempMonster.monster.stats[monsterStatsEnum.SPEED])  || //2.3.2 - the speed stat is different

                (tempMonster.action.priority === speedContest.action.priority && //2.4.1 - the action priotity is equal
                 speedContest.monster.stats[monsterStatsEnum.SPEED] === tempMonster.monster.stats[monsterStatsEnum.SPEED] && //2.4.2 - the speed stat is equal,
                 _shuffleContest(speedContest, tempMonster, instance))) //2.4.3 - use the a random id to difine priority
            ) return true;

            return false;
            /**
             * return number monsters which validate all conditions and play before "tempMonster",
             * can't return the same number for two different monster
             */
        }).length;

        /**
         * 3 - put the monster at his place:
         * if there is 3 monsters which is playing before put the monster to the index 3.
         */
        sortedMonsters[count] = tempMonster.monster.id;
    });
    return sortedMonsters;
};

const _shuffleContest = (monster1: MonsterSpeedInterface, monster2: MonsterSpeedInterface, instance: instanceInterface): boolean => {
    updateHistory(instance, {
        context: historyContextEnum.SPEEDCONTEST,
        content: { monstersID: [monster1.monster.id, monster2.monster.id] }
    })
    
    return monster1.shuffleID < monster2.shuffleID;
}

export {
    speedContest
}

