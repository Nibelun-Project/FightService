import { actionInterface, effectTypeEnum, targetTypeEnum } from "../interfaces/action";
import { instanceInterface } from "../interfaces/instance";
import { MonsterFightingInterface } from "../interfaces/monster";
import { SkillInterface } from "../interfaces/skill";
import { statusName } from "../interfaces/status";
import { applyStatus } from "./status";

const isSkillHighPriority = (action: actionInterface): boolean => {
    if (action.skill.priority < 50)  return true
    else return false
}

const paySkillCost = (instance: instanceInterface ,monster: MonsterFightingInterface, skill: SkillInterface) => {
    costType[skill.cost.type](instance, monster, skill.cost.value)
}

const costType = () => {

    const balance = (monster: MonsterFightingInterface, cost: number) => {}
    const hp = (monster: MonsterFightingInterface, cost: number) => {}
    const stamina = (instance: instanceInterface, monster: MonsterFightingInterface, cost: number) => {
        monster.stats.stamina -= cost
        if (monster.stats.stamina < 0) {
            monster.stats.hp -= monster.stats.stamina
            monster.stats.stamina = 0
            applyStatus(instance, monster, {
                "targetType": targetTypeEnum.SINGLE,
                "type": effectTypeEnum.STATUS,
                "power": 1,
                "status": statusName.OVERSTAIN
            })
            
        }
    }
	
    return [balance, hp, stamina]
}

export {
    isSkillHighPriority,
    paySkillCost
}