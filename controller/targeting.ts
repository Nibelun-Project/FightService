import { actionInterface, instanceInterface } from "../interfaces/fight";
import { getAlly, getEnnemies, getMonsterBySpot, getOnBoardMonsterByID, getOtherSpot, getPlayerByID, getSpotByMonsterID } from "./instance.js";

const getTargeting = (instance: instanceInterface, actionFromMonster: actionInterface, effectTargetType: string) => {
    const self = (): actionInterface[] => {
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
        const ally = getAlly(instance, actionFromMonster.sourceID);

        if (ally === undefined) return [];
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
        const effectListByTarget = [];
        const sourceMonster = getOnBoardMonsterByID(
            instance,
            actionFromMonster.sourceID
        );

        getPlayerByID(sourceMonster.playerID, instance).onBoard.forEach((monster) => {
            effectListByTarget.push({
                sourceID: actionFromMonster.sourceID,
                targetInfo: {
                    targetedPlayerID: sourceMonster.playerID,
                    spot: getSpotByMonsterID(instance, monster.id),
                },
                skill: actionFromMonster.skill,
            });
        });

        return effectListByTarget;
    };

    const ennemies = (): actionInterface[] => {
        const effectListByTarget = []
        const targetsList = getEnnemies(instance, actionFromMonster.sourceID);

        targetsList.forEach((monster) => {
            effectListByTarget.push({
                sourceID: actionFromMonster.sourceID,
                targetInfo: {
                    targetedPlayerID: monster.playerID,
                    spot: getSpotByMonsterID(instance, monster.id),
                },
                skill: actionFromMonster.skill,
            });
        });

        return effectListByTarget;
    };

    const single = (): actionInterface[] => {
        let target = getMonsterBySpot(instance, actionFromMonster.targetInfo);

        if (target === undefined || !target.isAlive) {
            // if spot is empty
            actionFromMonster.targetInfo.spot = getOtherSpot(
                actionFromMonster.targetInfo.spot
            ); // get the other spot
            target = getMonsterBySpot(instance, actionFromMonster.targetInfo);
            if (target === undefined || !target.isAlive) return []; // if empty too return []

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
        return [
            {
                sourceID: actionFromMonster.sourceID,
                targetInfo: actionFromMonster.targetInfo,
                skill: actionFromMonster.skill,
            },
        ];
    };

    const double = (): actionInterface[] => {
        const effectListByTarget = []
        getPlayerByID(actionFromMonster.targetInfo.targetedPlayerID, instance).onBoard.forEach(
            (monster) => {
                effectListByTarget.push({
                    sourceID: actionFromMonster.sourceID,
                    targetInfo: {
                        targetedPlayerID: monster.playerID,
                        spot: getSpotByMonsterID(instance, monster.id),
                    },
                    skill: actionFromMonster.skill,
                });
            }
        );

        return effectListByTarget;
    };

    const all = (): actionInterface[] => {
        const effectListByTarget = []
        let targetsList = [];

        for (let index = 0; index < instance.players.length; index++) {
            const player = instance.players[index];
            targetsList = targetsList.concat(player.onBoard)
        }

        targetsList.forEach((monster) => {
            effectListByTarget.push({
                sourceID: actionFromMonster.sourceID,
                targetInfo: {
                    targetedPlayerID: monster.playerID,
                    spot: getSpotByMonsterID(instance, monster.id),
                },
                skill: actionFromMonster.skill,
            });
        });

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