enum statusName {
    //Negative Status Conditions
    ASLEEP    = "asleep",
    BURNED    = "burned",
    COLD      = "cold", // TBD
    FROZEN    = "frozen",
    EXHAUSTED = "exhausted", // TBD
    ISOLATED  = "isolated", // TBD
    POISONED  = "poisoned",
    SEIZED    = "seized", // TBD
    TRAPPED   = "trapped", // TBD

    //Positive Status Conditions
    ALERTED     = "alerted", // TBD
    REGENERATED = "regenerated",
    EVADING     = "evading", // TBD
    IMMUNE      = "immune", // TBD
    INVIGORATED = "invigorated", // TBD

    //Neutral Status Conditions
    NULLIFIED = "nullified" // TBD
}

enum preventToPlayRound { 
    ASLEEP = statusName.ASLEEP, 
    FROZEN = statusName.FROZEN}

enum hasEffectAtTheEndOfRound { 
    BURNED = statusName.BURNED, 
    POISONED = statusName.POISONED, 
    REGENERATED = statusName.REGENERATED}

enum hasEffectDuringRound {
    EXHAUSTED = statusName.EXHAUSTED,   
    ISOLATED = statusName.ISOLATED, 
    SEIZED = statusName.SEIZED, 
    ALERTED = statusName.ALERTED,     
    EVADING = statusName.EVADING, 
    IMMUNE = statusName.IMMUNE, 
    INVIGORATED = statusName.INVIGORATED, 
    NULLIFIED = statusName.NULLIFIED}

type listOfStatus = typeof preventToPlayRound | typeof hasEffectAtTheEndOfRound | typeof hasEffectDuringRound

type statusNameType = `${statusName}`

interface statusInterface {
    name:  statusNameType,
    nbrRound: number
}

export {
    statusInterface,
    preventToPlayRound,
    hasEffectAtTheEndOfRound,
    hasEffectDuringRound,
    statusNameType,
    listOfStatus
}