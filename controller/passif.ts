import { instanceInterface } from "../interfaces/instance.js";
import { MonsterFightingInterface } from "../interfaces/monster.js";
import { effectInterface } from "../interfaces/skill.js";
import { effectsType } from "./action.js";
import { getAlly, getEnnemies, getMonsterBySpot, getOnBoardMonsterByID, getPlayerByID, getSpotByMonsterID } from "./instance.js";
import { getTargeting } from "./targeting.js";


const passif = (
    action,
    target,
    effect: effectInterface,
    instance: instanceInterface
) => {
    const ennemies = (owner: MonsterFightingInterface) => {
        return getEnnemies(instance, owner.id);
    };
    const ally = (owner: MonsterFightingInterface) => {
        return [getAlly(instance, owner.id)]
    };
    const allies = (owner: MonsterFightingInterface) => {
        return [getPlayerByID(owner.playerID, instance).onBoard];
    };
    const self = (owner: MonsterFightingInterface) => {
        return [owner];
    };

    const fromType = { ennemies, ally, allies, self };

    const checkPassif = (from, to, owner: MonsterFightingInterface) => {
        if (owner.passive.trigger.actionType && owner.passive.trigger.actionType !== effect.type) return false;
        const ownerFrom = fromType[owner.passive.trigger.from](owner);
        if (!ownerFrom.find((monster: MonsterFightingInterface) => {
            return !monster ? false : monster.id === from.id
        })) return false;
        if (owner.passive.trigger.to && !fromType[owner.passive.trigger.to](owner).find((monster: MonsterFightingInterface) => {
            return !monster ? false : monster.id === getMonsterBySpot(instance, to).id
        })) return false;

        if (owner.passive.trigger.type && owner.passive.trigger.type !== target.skill.type) return false;
        if (owner.passive.trigger.targetType && owner.passive.trigger.targetType !== target.skill.targetType) return false;

        return true;
    };

    const applyEffects = (owner: MonsterFightingInterface, from, to) => {
        owner.passive.effects.forEach((effect) => {
            const effectTargets = getTargeting(instance, {
                sourceID: owner.id,
                targetInfo:
                    effect.side === "from"
                        ? {
                            targetedPlayerID: getOnBoardMonsterByID(instance, from.id)
                                .playerID,
                            spot: getSpotByMonsterID(instance, from.id),
                        }
                        : to,
                skill: {
                    targetType: effect.targetType,
                    name: owner.passive.name,
                    description: owner.passive.description,
                    type: "neutral",
                    cost: { type: "stamina", value: 0 },
                    effects: {} as any,
                    priority: 0
                },
            }, effect.targetType);

            if (effectTargets <= 0) return false;
            effectTargets.forEach((target) => {
                effectsType()[effect.type](
                    instance,
                    target,
                    effect.power
                );
            });
        });
    };

    const before = (from, to, owner) => {
        if (!checkPassif(from, to, owner)) return false;
        console.log("before triggered by :" + owner.name);
        applyEffects(owner, from, to);

        return true;
    };

    const prevent = (from, to, owner) => {
        console.log("try to prevent :" + owner.name);
        if (!checkPassif(from, to, owner)) return false;
        applyEffects(owner, from, to);

        console.log("prevent triggered by :" + owner.name);
        return true;
    };

    const after = (from, to, owner) => {
        if (!checkPassif(from, to, owner)) return false;
        console.log("after triggered by :" + owner.name);
        applyEffects(owner, from, to);

        return true;
    };

    const eventWhen = { before, after, prevent };

    let passifBefore = [];
    let passifPrevent = [];
    let passifAfter = [];

    instance.players.forEach((player) => {
        player.onBoard.forEach((monster) => {
            switch (monster.passive.trigger.when) {
                case "before":
                    passifBefore.push(monster);
                    break;
                case "prevent":
                    passifPrevent.push(monster);
                    break;
                case "after":
                    passifAfter.push(monster);
                    break;
            }
        });
    })

    const loopThroughPassif = (whenArray) => {
        if (whenArray.length <= 0) return false;
        let prevented = false;
        for (let i = 0; i < whenArray.length; i++) {
            const monster = whenArray[i];
            if (
                eventWhen[monster.passive.trigger.when](
                    getOnBoardMonsterByID(instance, target.sourceID),
                    target.targetInfo,
                    monster
                ) &&
                monster.passive.when === "prevent"
            )
                prevented = true;
        }
        return prevented;
    };

    
    loopThroughPassif(passifBefore);
    if (!loopThroughPassif(passifPrevent)) action(instance, target, effect);
    loopThroughPassif(passifAfter);
};

export {
    passif
}

