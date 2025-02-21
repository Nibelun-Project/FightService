import { effectType, targetType } from "./action.js";
import { monsterType } from "./monster.js";
import { effectInterface } from "./skill.js";

enum triggerWhenEnum {
	BEFORE = "before",
	PREVENT = "prevent",
	AFTER = "after",
}

type triggerWhenType = `${triggerWhenEnum}`;

interface PassiveInterface {
	name: string;
	description: string;
	trigger: {
		when: triggerWhenType;
		from: string;
		actionType?: effectType;
		to?: string;
		type?: monsterType;
		targetType?: targetType;
	};
	effects: effectInterface[];
}

export { PassiveInterface };
