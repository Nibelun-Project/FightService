import {
	actionInterface,
	effectTypeEnum,
	targetTypeEnum,
} from "../interfaces/action.js";
import {
	fightInfoInterface,
	historyContextEnum,
} from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
} from "../interfaces/monster.js";
import { SkillInterface } from "../interfaces/skill.js";
import { statusName } from "../interfaces/status.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";
import { applyStatus } from "./status.js";

const isSkillHighPriority = (action: actionInterface): boolean => {
	if (action.skill.priority < 50) return true;
	else return false;
};

const paySkillCost = (
	fightInfo: fightInfoInterface,
	monster: MonsterFightingInterface,
	skill: SkillInterface,
) => {
	costType()[skill.cost.type](fightInfo, monster, skill.cost.value);
};

const costType = () => {
	const balance = (
		fightInfo: fightInfoInterface,
		monster: MonsterFightingInterface,
		cost: number,
	) => {};
	const hp = (
		fightInfo: fightInfoInterface,
		monster: MonsterFightingInterface,
		cost: number,
	) => {};
	const stamina = (
		fightInfo: fightInfoInterface,
		monster: MonsterFightingInterface,
		cost: number,
	) => {
		monster.stats.stamina -= cost;

		updateHistory(fightInfo, {
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
			applyStatus(fightInfo, monster, {
				targetType: targetTypeEnum.SINGLE,
				type: effectTypeEnum.STATUS,
				power: 1,
				status: statusName.OVERSTRAIN,
			});

			updateHistory(fightInfo, {
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
