import { effectType, targetType } from "./fight";
import { monsterType } from "./monster";
import { sideType } from "./passive";

enum skillCostEnum {
	STAMINA = "stamina",
	HP = "hp",
	BALANCE = "balance",
}

type skillCostType = `${skillCostEnum}`

interface SkillInterface {
	name: string;
	description: string;
	type: monsterType;
	cost: { type: skillCostType; value: number };
	effects: effectInterface[];
	targetType: targetType
	priority: number;
}

interface effectInterface {
	targetType: targetType
	side?: sideType
	type: effectType
	power: number;
}

export { SkillInterface, effectInterface };
