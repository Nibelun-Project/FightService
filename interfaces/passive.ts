import { effectTypeEnum, targetTypeEnum } from "./fight";
import { monsterType } from "./monster";

enum targetEnum {
	TO = "to",
	FROM = "from",
}

enum triggerWhenEnum {
	BEFORE = "before",
	PREVENT = "prevent",
	AFTER = "after",
}

interface PassiveInterface {
	name: string;
	description: string;
	trigger: {
		when: `${triggerWhenEnum}`;
		actionType: `${effectTypeEnum}`;
		from: string;
		to: string;
		type: `${monsterType}`;
		target: string;
	};
	effects: {
		targetType: `${targetTypeEnum}`;
		target: `${targetEnum}`;
		type: `${effectTypeEnum}`;
		power: number;
	}[];
}

export { PassiveInterface, targetEnum };
