import { hasEffectOnApply } from "./status";

enum modCause {
	STATUS = "status",
}

interface modInterface {
	cause: string;
	content: modContentInterface;
}

interface modContentInterface {
	status?: `${hasEffectOnApply}`;
	value?: number;
}

export { modInterface, modCause };
