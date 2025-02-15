import { actionInterface } from "../interfaces/action";
import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import { checkEndgame, getPlayerByID } from "./instance.js";
import {
  MonsterFightingInterface,
  monsterStatsEnum,
} from "../interfaces/monster.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";

const deathCheckActionTaget = (
  instance: instanceInterface,
  actionsByTarget: actionInterface
): boolean => {
  if (_isNeededToCheckDeath(actionsByTarget)) {
    const monster = getPlayerByID(
      actionsByTarget.targetInfo.targetedPlayerID,
      instance
    ).onBoard[actionsByTarget.targetInfo.spot];
    if (monster.stats[monsterStatsEnum.HP] <= 0) {
      _killActionTaget(instance, actionsByTarget);
      checkEndgame(instance, actionsByTarget.targetInfo.targetedPlayerID);
      return true;
    }
  }
  return false;
};

const deathCheckMonster = (
  instance: instanceInterface,
  monster: MonsterFightingInterface
): boolean => {
  if (monster.stats[monsterStatsEnum.HP] <= 0) {
    _killMonster(instance, monster);
    checkEndgame(instance, monster.playerID);
    return true;
  }
  return false;
};

const _isNeededToCheckDeath = (actionsByTarget: actionInterface): boolean => {
  if (actionsByTarget.targetInfo.targetedPlayerID) return true;
  else return false;
};

const _killActionTaget = (
  instance: instanceInterface,
  actionsByTarget: actionInterface
) => {
  const monster = getPlayerByID(
    actionsByTarget.targetInfo.targetedPlayerID,
    instance
  ).onBoard[actionsByTarget.targetInfo.spot];
  _killMonster(instance, monster);
};

const _killMonster = (
  instance: instanceInterface,
  monster: MonsterFightingInterface
) => {
  if (monster.isAlive)
    updateHistory(instance, {
      context: historyContextEnum.KILL,
      content: { monster: convertMonsterToHistory(monster) },
    });

  monster.stats[monsterStatsEnum.HP] = 0;
  monster.isAlive = false;
};

export { deathCheckActionTaget, deathCheckMonster };
