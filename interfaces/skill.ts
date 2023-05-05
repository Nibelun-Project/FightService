import { effectTypeEnum, targetTypeEnum } from "./fight";
import { monsterType } from "./monster";

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
	effects: {
		targetType: `${targetTypeEnum}`;
		type: `${effectTypeEnum}`;
		power: number;
	}[];
	targetType: `${targetTypeEnum}`;
	priority: number;
}

export { SkillInterface };
