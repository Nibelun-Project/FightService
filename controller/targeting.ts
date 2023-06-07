import { actionInterface, instanceInterface } from "../interfaces/fight";
import { getAlly, getEnnemies, getMonsterBySpot, getOnBoardMonsterByID, getOtherSpot, getPlayerByID, getSpotByMonsterID, isTargetable } from "./instance.js";

const getTargeting = (instance: instanceInterface, actionFromMonster: actionInterface, effectTargetType: string) => {
    const self = (): actionInterface[] => {
        console.log("Self");
        const self = getOnBoardMonsterByID(instance, actionFromMonster.sourceID)
        if (!isTargetable(self)) return [];        
        return [
            {
                sourceID: actionFromMonster.sourceID,
                targetInfo: {
                    targetedPlayerID: getOnBoardMonsterByID(
                        instance,
                        actionFromMonster.sourceID
                    ).playerID,
                    spot: getSpotByMonsterID(instance, actionFromMonster.sourceID),
                },
                skill: actionFromMonster.skill,
            }
        ]
    };

    const ally = (): actionInterface[] => {
        console.log("Ally");
        const ally = getAlly(instance, actionFromMonster.sourceID);        
        if (!isTargetable(ally)) return [];
        return [
            {
                sourceID: actionFromMonster.sourceID,
                targetInfo: {
                    targetedPlayerID: ally.playerID,
                    spot: actionFromMonster.targetInfo.spot,
                },
                skill: actionFromMonster.skill,
            },
        ]
    };

    const allies = (): actionInterface[] => {
        console.log("Allies");

        const effectListByTarget = [];
        const sourceMonster = getOnBoardMonsterByID(
            instance,
            actionFromMonster.sourceID
        );

        getPlayerByID(sourceMonster.playerID, instance).onBoard.forEach((monster) => {
            if (isTargetable(monster)) {
                effectListByTarget.push({
                    sourceID: actionFromMonster.sourceID,
                    targetInfo: {
                        targetedPlayerID: sourceMonster.playerID,
                        spot: getSpotByMonsterID(instance, monster.id),
                    },
                    skill: actionFromMonster.skill,
                });
            }
        });

        return effectListByTarget;
    };

    const ennemies = (): actionInterface[] => {
        console.log("Ennemies");

        const effectListByTarget = []
        const targetsList = getEnnemies(instance, actionFromMonster.sourceID);

        targetsList.forEach((monster) => {
            if (isTargetable(monster)) {
                effectListByTarget.push({
                    sourceID: actionFromMonster.sourceID,
                    targetInfo: {
                        targetedPlayerID: monster.playerID,
                        spot: getSpotByMonsterID(instance, monster.id),
                    },
                    skill: actionFromMonster.skill,
                });
            }
        });

        return effectListByTarget;
    };

    const single = (): actionInterface[] => {
        console.log("Single");

        let target = getMonsterBySpot(instance, actionFromMonster.targetInfo);

        if (isTargetable(target)) {
            // if spot is empty
            actionFromMonster.targetInfo.spot = getOtherSpot(
                actionFromMonster.targetInfo.spot
            ); // get the other spot
            target = getMonsterBySpot(instance, actionFromMonster.targetInfo);
            if (isTargetable(target)) return []; // if empty too return []

            return [
                {
                    sourceID: actionFromMonster.sourceID,
                    targetInfo: {
                        targetedPlayerID: target.playerID,
                        spot: actionFromMonster.targetInfo.spot,
                    },
                    skill: actionFromMonster.skill,
                },
            ]
        }

        return [
            {
                sourceID: actionFromMonster.sourceID,
                targetInfo: actionFromMonster.targetInfo,
                skill: actionFromMonster.skill,
            },
        ]
    };

    const singleBackstage = (): actionInterface[] => {
        console.log("Single Backstage");

        return [
            {
                sourceID: actionFromMonster.sourceID,
                targetInfo: actionFromMonster.targetInfo,
                skill: actionFromMonster.skill,
            },
        ];
    };

    const double = (): actionInterface[] => {
        console.log("Double");

        const effectListByTarget = []
        getPlayerByID(actionFromMonster.targetInfo.targetedPlayerID, instance).onBoard.forEach(
            (monster) => {
                if(isTargetable(monster)) {
                    effectListByTarget.push({
                        sourceID: actionFromMonster.sourceID,
                        targetInfo: {
                            targetedPlayerID: monster.playerID,
                            spot: getSpotByMonsterID(instance, monster.id),
                        },
                        skill: actionFromMonster.skill,
                    });
                }
            }
        );

        return effectListByTarget;
    };

    const all = (): actionInterface[] => {
        console.log("All");

        const effectListByTarget = []
        let targetsList = [];

        instance.players.forEach((player) => {
            player.onBoard.forEach((monster) => {
                if (isTargetable(monster)) {
                    effectListByTarget.push({
                        sourceID: actionFromMonster.sourceID,
                        targetInfo: {
                            targetedPlayerID: monster.playerID,
                            spot: getSpotByMonsterID(instance, monster.id),
                        },
                        skill: actionFromMonster.skill,
                    });
                }
            });
        })
        return effectListByTarget;
    };

    const TargetTypes = {
        self,
        ally,
        allies,
        ennemies,
        single,
        singleBackstage,
        double,
        all,
    };
    return TargetTypes[effectTargetType]();
};
export {
    getTargeting
}