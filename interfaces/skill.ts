import { effectType, targetType } from "./action";
import { monsterType } from "./monster";
import { statusNameType } from "./status";

enum skillCostEnum {
	STAMINA = "stamina",
	HP = "hp",
	BALANCE = "balance",
}

enum sideEnum {
	TO = "to",
	FROM = "from",
}

type sideType = `${sideEnum}`;
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
	targetType: targetType;
	side?: sideType;
	type: effectType;
	power?: number;
	status?: statusNameType;
}

export { SkillInterface, effectInterface };
