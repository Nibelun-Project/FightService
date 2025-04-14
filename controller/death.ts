import { actionInterface } from "../interfaces/action";
import {
	fightInfoInterface,
	historyContextEnum,
} from "../interfaces/history.js";
import { Instance } from "../interfaces/instance.js";
import { getPlayerByID } from "./instance.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
} from "../interfaces/monster.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";

const deathCheckActionTaget = (
	instance: Instance,
	actionsByTarget: actionInterface,
): boolean => {
	if (_isNeededToCheckDeath(actionsByTarget)) {
		const monster = getPlayerByID(
			actionsByTarget.targetInfo.targetedPlayerID,
			instance,
		).onBoard[actionsByTarget.targetInfo.spot];
		if (monster.stats[monsterStatsEnum.HP] <= 0) {
			_killActionTaget(instance, actionsByTarget);
			instance.checkEndgame(monster.playerID);
			return true;
		}
	}
	return false;
};

const deathCheckMonster = (
	instance: Instance,
	monster: MonsterFightingInterface,
): boolean => {
	if (monster.stats[monsterStatsEnum.HP] <= 0) {
		_killMonster(instance.fightInfo, monster);
		instance.checkEndgame(monster.playerID);
		return true;
	}
	return false;
};

const _isNeededToCheckDeath = (actionsByTarget: actionInterface): boolean => {
	if (actionsByTarget.targetInfo.targetedPlayerID) return true;
	else return false;
};

const _killActionTaget = (
	instance: Instance,
	actionsByTarget: actionInterface,
) => {
	const monster = getPlayerByID(
		actionsByTarget.targetInfo.targetedPlayerID,
		instance,
	).onBoard[actionsByTarget.targetInfo.spot];
	_killMonster(instance.fightInfo, monster);
};

const _killMonster = (
	fightInfo: fightInfoInterface,
	monster: MonsterFightingInterface,
) => {
	if (monster.isAlive)
		updateHistory(fightInfo, {
			context: historyContextEnum.KILL,
			content: { monster: convertMonsterToHistory(monster) },
		});

	monster.stats[monsterStatsEnum.HP] = 0;
	monster.isAlive = false;
};

export { deathCheckActionTaget, deathCheckMonster };
