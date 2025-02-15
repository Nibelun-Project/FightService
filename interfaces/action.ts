import { SkillInterface } from "./skill.js";

enum targetTypeEnum {
  ALL = "all",
  ALLIES = "allies",
  ALLY = "ally",
  DOUBLE = "double",
  ENNEMIES = "ennemies",
  SELF = "self",
  SINGLE = "single",
}

enum effectTypeEnum {
  BALANCE = "balance",
  DAMAGE = "damage",
  HEAL = "heal",
  MATTACK = "+attack",
  PATTACK = "+attack",
  STATUS = "status",
  POISON = "poison",
  SWAP = "swap",
}
type effectType = `${effectTypeEnum}`;
type targetType = `${targetTypeEnum}`;

interface actionInterface {
  sourceID: string;
  targetInfo: targetInfoType;
  skill: SkillInterface;
}

interface targetInfoPlayerID {
  targetedPlayerID: string;
  spot: number;
  id?: never;
}
interface targetInfoID {
  targetedPlayerID?: never;
  spot?: never;
  id: string;
}

type targetInfoType = targetInfoPlayerID | targetInfoID;

export {
  actionInterface,
  targetInfoType,
  effectType,
  effectTypeEnum,
  targetType,
  targetTypeEnum,
};
