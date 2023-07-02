
enum statusName {
    //Negative Status Conditions
    ASLEEP    = "asleep",
    BURNED    = "burned",
    COLD      = "cold",
    FROZEN    = "frozen",
    EXHAUSTED = "exhausted",
    ISOLATED  = "isolated",
    POISONED = "poisoned",
    SEIZED    = "seeized",
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

interface statusInterface {
    name:  `${statusName}`,
    nbrRound: number
}

export {
    statusInterface,
    statusName,
}