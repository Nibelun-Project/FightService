enum statusName {
    //Negative Status Conditions
    ASLEEP    = "asleep",
    BURNED    = "burned",
    COLD      = "cold",
    FROZEN    = "frozen",
    EXHAUSTED = "exhausted",
    ISOLATED  = "isolated",
    POISONED  = "poisoned",
    SEIZED    = "seized",
    TRAPPED   = "trapped",

    //Positive Status Conditions
    ALERTED     = "alerted",
    REGENERATED = "regenerated",
    EVADING     = "evading",
    IMMUNE      = "immune",
    INVIGORATED = "invigorated",

    //Neutral Status Conditions
    NULLIFIED = "nullified"
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