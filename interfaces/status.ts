enum statusName {
	//Negative Status Conditions
	ASLEEP = "asleep",
	BURNED = "burned",
	COLD = "cold",
	FROZEN = "frozen",
	EXHAUSTED = "exhausted",
	ISOLATED = "isolated", // TBD
	OVERSTRAIN = "overstrain",
	POISONED = "poisoned",
	SEIZED = "seized", // TBD
	TRAPPED = "trapped", // TBD

	//Positive Status Conditions
	ALERTED = "alerted", // TBD
	REGENERATED = "regenerated",
	EVADING = "evading", // TBD
	IMMUNE = "immune", // TBD
	INVIGORATED = "invigorated",

	//Neutral Status Conditions
	NULLIFIED = "nullified", // TBD
}

type statusNameType = `${statusName}`;

enum statusConst {
	BURNED = 0.05,
	EXHAUSTED = 1.5,
	INVIGORATED = 0.5,
	POISONED = 0.05,
	REGENERATED = 0.05,
}

enum preventToPlayRound {
	ASLEEP = statusName.ASLEEP,
	FROZEN = statusName.FROZEN,
	OVERSTRAIN = statusName.OVERSTRAIN,
}

enum hasEffectAtTheEndOfRound {
	BURNED = statusName.BURNED,
	POISONED = statusName.POISONED,
	REGENERATED = statusName.REGENERATED,
}

enum hasEffectDuringRound {
	EXHAUSTED = statusName.EXHAUSTED,
	ISOLATED = statusName.ISOLATED,
	SEIZED = statusName.SEIZED,
	ALERTED = statusName.ALERTED,
	EVADING = statusName.EVADING,
	IMMUNE = statusName.IMMUNE,
	INVIGORATED = statusName.INVIGORATED,
	NULLIFIED = statusName.NULLIFIED,
}

enum canBeReApply {
	COLD = statusName.COLD,
}

type listOfStatus =
	| typeof preventToPlayRound
	| typeof hasEffectAtTheEndOfRound
	| typeof hasEffectDuringRound
	| typeof canBeReApply;

interface statusInterface {
	name: statusNameType;
	nbrRound: number;
}

export {
	statusInterface,
	preventToPlayRound,
	hasEffectAtTheEndOfRound,
	hasEffectDuringRound,
	canBeReApply,
	statusNameType,
	statusName,
	listOfStatus,
	statusConst,
};
