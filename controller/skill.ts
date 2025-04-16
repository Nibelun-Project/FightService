import {
	actionInterface,
	effectTypeEnum,
	targetTypeEnum,
} from "../interfaces/action.js";
import { FightInfo, historyContextEnum } from "../interfaces/history.js";
import { MonsterFighting, monsterStatsEnum } from "../interfaces/monster.js";
import { SkillInterface } from "../interfaces/skill.js";
import { statusName } from "../interfaces/status.js";
import { applyStatus } from "./status.js";

const isSkillHighPriority = (action: actionInterface): boolean => {
	if (action.skill.priority < 50) return true;
	else return false;
};

const paySkillCost = (
	fightInfo: FightInfo,
	monster: MonsterFighting,
	skill: SkillInterface,
) => {
	costType()[skill.cost.type](fightInfo, monster, skill.cost.value);
};

const costType = () => {
	const balance = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		cost: number,
	) => {};
	const hp = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		cost: number,
	) => {};
	const stamina = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		cost: number,
	) => {
		monster.stats.stamina -= cost;

		fightInfo.updateHistory({
			context: historyContextEnum.DAMAGE,
			content: {
				monster: fightInfo.convertMonsterToHistory(monster),
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

			fightInfo.updateHistory({
				context: historyContextEnum.DAMAGE,
				content: {
					monster: fightInfo.convertMonsterToHistory(monster),
					statName: monsterStatsEnum.HP,
					statChanges: damage,
				},
			});
		}
	};

	return { balance, hp, stamina };
};

export { isSkillHighPriority, paySkillCost };
