import { modCause, modInterface } from "../interfaces/modification";
import { SkillInterface } from "../interfaces/skill";
import { statusNameType } from "../interfaces/status";

const updateModOnSkill = (skill: SkillInterface, mod: modInterface) => {
	if (skill.mod === undefined) skill["mod"] = [];
	skill.mod.push(mod);
};

const removeModOnSkill = (skill: SkillInterface, mod: modInterface) => {
	if (
		skill.mod !== undefined &&
		hasSkillModStatus(skill, mod.content.status)
	) {
		skill.mod.splice(skill.mod.indexOf(skill.mod[mod.content.status]), 1);
	}
};

const getSkillModByStatus = (
	skill: SkillInterface,
	status: statusNameType,
): modInterface => {
	return skill.mod.find((mod) => mod.content.status === status);
};

const hasSkillModStatus = (skill: SkillInterface, status: statusNameType) => {
	return skill.mod.some((mod) => mod.content.status === status);
};

export {
	updateModOnSkill,
	getSkillModByStatus,
	removeModOnSkill,
	hasSkillModStatus,
};
