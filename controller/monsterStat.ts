import { instanceInterface } from "../interfaces/instance.js"
import { MonsterFightingInterface, monsterStatsEnum } from "../interfaces/monster.js"
import { statusName } from "../interfaces/status.js"
import { isOnBoard } from "./instance.js"
import { hastStatus } from "./status.js"

const staminaRefill = (instance: instanceInterface) => {
    instance.players.forEach((player) => {
        player.onBoard.forEach((monster) => {
            if (hastStatus(monster, statusName.EXHAUSTED) &&
                hastStatus(monster, statusName.INVIGORATED) ||
                !hastStatus(monster, statusName.EXHAUSTED) &&
                !hastStatus(monster, statusName.INVIGORATED)) {
                    refillStat()[monsterStatsEnum.STAMINA](monster, 10)
                
            }else if (hastStatus(monster, statusName.EXHAUSTED)) {
                refillStat()[monsterStatsEnum.STAMINA](monster, 5)
            }else if (hastStatus(monster, statusName.INVIGORATED)) {
                refillStat()[monsterStatsEnum.STAMINA](monster, 15)
            }
        })
        player.team.filter(
            (monster) => !isOnBoard(instance, monster.id)
            ).forEach((monster) => {
                refillStat()[monsterStatsEnum.STAMINA](monster, 15)
        })
    })
}

const refillStat = () => {
    
    const balance = (monster: MonsterFightingInterface, value: number) => { 
        if (monster.stats.balance !== monster.starting.balance) { 
            monster.stats.balance += value
            if (monster.stats.balance > monster.starting.balance) monster.stats.balance = monster.starting.balance
        }
    }
    const hp = (monster: MonsterFightingInterface, value: number) => { 
        if (monster.stats.hp !== monster.starting.hp) { 
            monster.stats.hp += value
            if (monster.stats.hp > monster.starting.hp) monster.stats.hp = monster.starting.hp
        }
    }
    const stamina = (monster: MonsterFightingInterface, value: number) => { 
        if (monster.stats.stamina !== monster.starting.stamina) { 
            monster.stats.stamina += value
            if (monster.stats.stamina > monster.starting.stamina) monster.stats.stamina = monster.starting.stamina
        }
    }

    return {balance, hp, stamina}
    
}

export {
    staminaRefill,
    refillStat
}