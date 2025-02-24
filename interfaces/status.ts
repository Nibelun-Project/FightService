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
	EXHAUSTED = -0.5,
	INVIGORATED = 1.5,
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

enum hasEffectOnApply {
	COLD = statusName.COLD,
	EXHAUSTED = statusName.EXHAUSTED,
	INVIGORATED = statusName.INVIGORATED,
}

enum hasEffectOnRemove {
	EXHAUSTED = statusName.EXHAUSTED,
	INVIGORATED = statusName.INVIGORATED,
}

enum canBeReApply {
	COLD = statusName.COLD,
}

type listOfStatus =
	| typeof preventToPlayRound
	| typeof hasEffectAtTheEndOfRound
	| typeof hasEffectOnApply
	| typeof hasEffectOnRemove
	| typeof canBeReApply;

interface statusInterface {
	name: statusNameType;
	nbrRound: number;
}

export {
	statusInterface,
	preventToPlayRound,
	hasEffectAtTheEndOfRound,
	hasEffectOnApply,
	hasEffectOnRemove,
	canBeReApply,
	statusNameType,
	statusName,
	listOfStatus,
	statusConst,
};
