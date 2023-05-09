import { effectType, targetType } from "./fight";
import { monsterType } from "./monster";
import { effectInterface } from "./skill";

enum sideEnum {
	TO = "to",
	FROM = "from",
}

enum triggerWhenEnum {
	BEFORE = "before",
	PREVENT = "prevent",
	AFTER = "after",
}

type sideType = `${sideEnum}`;
type triggerWhenType = `${triggerWhenEnum}`;

interface PassiveInterface {
	name: string;
	description: string;
	trigger: {
		when: triggerWhenType
		from: string;
		actionType?: effectType
		to?: string;
		type?: monsterType;
		targetType?: targetType
	};
	effects: effectInterface[];
}

export { PassiveInterface, sideEnum, sideType };
