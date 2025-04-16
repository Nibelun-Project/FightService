import { actionInterface } from "../interfaces/action";
import { FightInfo, historyContextEnum } from "../interfaces/history.js";
import { Instance } from "../interfaces/instance.js";
import { MonsterFighting, monsterStatsEnum } from "../interfaces/monster.js";

const deathCheckActionTaget = (
	instance: Instance,
	actionsByTarget: actionInterface,
): boolean => {
	if (_isNeededToCheckDeath(actionsByTarget)) {
		const monster = instance.getPlayerByID(
			actionsByTarget.targetInfo.targetedPlayerID,
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
	monster: MonsterFighting,
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
	const monster = instance.getPlayerByID(
		actionsByTarget.targetInfo.targetedPlayerID,
	).onBoard[actionsByTarget.targetInfo.spot];
	_killMonster(instance.fightInfo, monster);
};

const _killMonster = (fightInfo: FightInfo, monster: MonsterFighting) => {
	if (monster.isAlive)
		fightInfo.updateHistory({
			context: historyContextEnum.KILL,
			content: { monster: fightInfo.convertMonsterToHistory(monster) },
		});

	monster.stats[monsterStatsEnum.HP] = 0;
	monster.isAlive = false;
};

export { deathCheckActionTaget, deathCheckMonster };
