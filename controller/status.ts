import { historyContextEnum } from "../interfaces/history.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
  MonsterFightingInterface,
  monsterStatsEnum,
} from "../interfaces/monster.js";
import { effectInterface } from "../interfaces/skill.js";
import {
  canBeReApply,
  hasEffectAtTheEndOfRound,
  listOfStatus,
  statusConst,
  statusInterface,
  statusName,
  statusNameType,
} from "../interfaces/status.js";
import { deathCheckMonster } from "./death.js";
import { convertMonsterToHistory, updateHistory } from "./history.js";
import { refillStat } from "./monsterStat.js";

const _rollStatus = (
  instance: instanceInterface,
  monster: MonsterFightingInterface
) => {
  if (monster.isAlive === true) {
    monster.statuses.forEach((status) => {
      if (
        Object.values<statusNameType>(hasEffectAtTheEndOfRound).includes(
          status.name
        )
      ) {
        _statusEffects(instance, monster)[status.name]();
      }

      if (status.nbrRound-- === 1) {
        monster.statuses.splice(monster.statuses.indexOf(status), 1);
      }
    });
    deathCheckMonster(instance, monster);
  }
};

const rollOnboardStatus = (instance: instanceInterface) => {
  instance.players.forEach((player) => {
    player.onBoard.forEach((monster) => {
      _rollStatus(instance, monster);
    });
  });
};

const _statusEffects = (
  instance: instanceInterface,
  monster: MonsterFightingInterface
) => {
  const burned = () => {
    monster.stats.hp -= monster.starting.hp * statusConst.BURNED;
    updateHistory(instance, {
      context: historyContextEnum.DAMAGE,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusName.BURNED,
        statName: monsterStatsEnum.HP,
        statChanges: monster.starting.hp * statusConst.BURNED,
      },
    });
  };

  const poisoned = () => {
    monster.stats.hp -= monster.starting.hp * statusConst.POISONED;
    updateHistory(instance, {
      context: historyContextEnum.DAMAGE,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusName.POISONED,
        statName: monsterStatsEnum.HP,
        statChanges: monster.starting.hp * statusConst.POISONED,
      },
    });
  };

  const regenerated = () => {
    refillStat()[monsterStatsEnum.HP](
      monster,
      monster.starting.hp * statusConst.REGENERATED
    );
    updateHistory(instance, {
      context: historyContextEnum.HEAL,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusName.REGENERATED,
        statName: monsterStatsEnum.HP,
        statChanges: monster.starting.hp * statusConst.REGENERATED,
      },
    });
  };

  return { burned, poisoned, regenerated };
};

const buildStatus = (
  name: statusNameType,
  nbrRound: number
): statusInterface => {
  return {
    name: name,
    nbrRound: nbrRound,
  };
};

const applyStatus = (
  instance: instanceInterface,
  monster: MonsterFightingInterface,
  effect: effectInterface
) => {
  const statusToApply = buildStatus(effect.status, effect.power);
  let nbrRound = 0;
  if (
    monster.statuses.some(
      (monsterStatus) => monsterStatus.name === statusToApply.name
    ) &&
    !isStatusFromList(statusToApply.name, canBeReApply)
  ) {
    updateHistory(instance, {
      context: historyContextEnum.STATUS,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusToApply.name,
        nbrRound: 0,
      },
    });
  } else if (
    monster.statuses.some(
      (monsterStatus) => monsterStatus.name === statusToApply.name
    ) &&
    isStatusFromList(statusToApply.name, canBeReApply)
  ) {
    reApplyStatus()[statusToApply.name](instance, monster, effect);
  } else {
    nbrRound = effect.power;
    monster.statuses.push(statusToApply);

    updateHistory(instance, {
      context: historyContextEnum.STATUS,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusToApply.name,
        nbrRound: nbrRound,
      },
    });
  }
};

const reApplyStatus = () => {
  const cold = (
    instance: instanceInterface,
    monster: MonsterFightingInterface,
    effect: effectInterface
  ) => {
    const nbrRound =
      getStatus(monster, statusName.COLD).nbrRound + effect.power;
    monster.statuses.splice(
      monster.statuses.indexOf(monster.statuses[statusName.COLD]),
      1
    );
    monster.statuses.push(buildStatus(statusName.FROZEN, nbrRound));

    updateHistory(instance, {
      context: historyContextEnum.STATUS,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusName.COLD,
        nbrRound: -1,
      },
    });

    updateHistory(instance, {
      context: historyContextEnum.STATUS,
      content: {
        targetMonster: convertMonsterToHistory(monster),
        statusName: statusName.FROZEN,
        nbrRound: nbrRound,
      },
    });
  };

  return { cold };
};

const isStatusFromList = (
  status: statusNameType,
  statusList: listOfStatus
): boolean => {
  return Object.values<statusNameType>(statusList).includes(status);
};

const hasStatusFromList = (
  monster: MonsterFightingInterface,
  statusList: listOfStatus
): boolean => {
  return monster.statuses.some((status) =>
    Object.values<statusNameType>(statusList).includes(status.name)
  );
};

const hastStatus = (
  monster: MonsterFightingInterface,
  status: statusNameType
): boolean => {
  return monster.statuses.some((status) => status.name === status.name);
};

const getStatus = (
  monster: MonsterFightingInterface,
  statusName: statusNameType
): statusInterface => {
  return monster.statuses.find((status) => status.name === statusName);
};

export {
  rollOnboardStatus,
  buildStatus,
  applyStatus,
  hasStatusFromList,
  hastStatus,
};
