import { effectTypeEnum, targetTypeEnum } from "./fight";
import { monsterType } from "./monster";
import { targetEnum } from "./passive";

enum skillCostEnum {
	STAMINA = "stamina",
	HP = "hp",
	BALANCE = "balance",
}

interface SkillInterface {
	name: string;
	description: string;
	type: `${monsterType}`;
	cost: { type: `${skillCostEnum}`; value: number };
	effects: effectInterface[];
	targetType: `${targetTypeEnum}`;
	priority: number;
}

interface effectInterface {
	targetType: `${targetTypeEnum}`;
	target?: `${targetEnum}`;
	type: `${effectTypeEnum}`;
	power: number;
}

export { SkillInterface, effectInterface };
