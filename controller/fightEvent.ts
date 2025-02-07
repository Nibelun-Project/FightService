import { instanceInterface } from "../interfaces/instance"
import { statusName } from "../interfaces/status";
import { isOnBoard } from "./instance";
import { hastStatus, rollOnboardStatus } from "./status";

const endRoundEvents = (instance: instanceInterface) => {
    staminaRefill(instance)
    rollOnboardStatus(instance)
}

const staminaRefill = (instance: instanceInterface) => {
    instance.players.forEach((player) => {
        player.onBoard.forEach((monster) => {
            if (hastStatus(monster, statusName.EXHAUSTED) &&
                hastStatus(monster, statusName.INVIGORATED) ||
                !hastStatus(monster, statusName.EXHAUSTED) &&
                !hastStatus(monster, statusName.INVIGORATED)) {
                    //todo
                
            }else if (hastStatus(monster, statusName.EXHAUSTED)) {
                //todo
            }else if (hastStatus(monster, statusName.INVIGORATED)) {
                //todo
            }
        })
        player.team.filter(
            (monster) => !isOnBoard(instance, monster.id)
            ).forEach((monster) => {
            if (monster.stats.stamina !== monster.starting.stamina) { 
                monster.stats.stamina += 10 
                if (monster.stats.stamina > monster.starting.stamina) monster.stats.stamina = monster.starting.stamina
            }
        })
        
    })

}

export {
    endRoundEvents
}