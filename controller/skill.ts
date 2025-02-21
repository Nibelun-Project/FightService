import {
	actionInterface,
	effectTypeEnum,
	targetTypeEnum,
} from "../interfaces/action.js";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
} from "../interfaces/monster.js";
import { SkillInterface } from "../interfaces/skill.js";
import { statusConst, statusName } from "../interfaces/status.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";
import { applyStatus, hastStatus } from "./status.js";

const isSkillHighPriority = (action: actionInterface): boolean => {
	if (action.skill.priority < 50) return true;
	else return false;
};

const paySkillCost = (
	instance: instanceInterface,
	monster: MonsterFightingInterface,
	skill: SkillInterface,
) => {
	costType()[skill.cost.type](instance, monster, skill.cost.value);
};

const costType = () => {
	const balance = (
		instance: instanceInterface,
		monster: MonsterFightingInterface,
		cost: number,
	) => {};
	const hp = (
		instance: instanceInterface,
		monster: MonsterFightingInterface,
		cost: number,
	) => {};
	const stamina = (
		instance: instanceInterface,
		monster: MonsterFightingInterface,
		cost: number,
	) => {
		if (
			hastStatus(monster, statusName.EXHAUSTED) &&
			!hastStatus(monster, statusName.INVIGORATED)
		)
			cost *= statusConst.EXHAUSTED;
		else if (
			hastStatus(monster, statusName.INVIGORATED) &&
			!hastStatus(monster, statusName.EXHAUSTED)
		)
			cost *= statusConst.INVIGORATED;
		monster.stats.stamina -= cost;

		updateHistory(instance, {
			context: historyContextEnum.DAMAGE,
			content: {
				monster: convertMonsterToHistory(monster),
				statName: monsterStatsEnum.STAMINA,
				statChanges: cost,
			},
		});

		if (monster.stats.stamina < 0) {
			const damage = monster.stats.stamina;
			monster.stats.hp -= damage;
			monster.stats.stamina = 0;
			applyStatus(instance, monster, {
				targetType: targetTypeEnum.SINGLE,
				type: effectTypeEnum.STATUS,
				power: 1,
				status: statusName.OVERSTRAIN,
			});

			updateHistory(instance, {
				context: historyContextEnum.DAMAGE,
				content: {
					monster: convertMonsterToHistory(monster),
					statName: monsterStatsEnum.HP,
					statChanges: damage,
				},
			});
		}
	};

	return { balance, hp, stamina };
};

export { isSkillHighPriority, paySkillCost };
