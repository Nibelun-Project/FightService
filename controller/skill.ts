import { actionInterface } from "../interfaces/action";

const isActionHighPriority = (action: actionInterface): boolean => {
    if (action.skill.priority < 50)  return true
    else return false
}

export {
    isActionHighPriority
}