import { instanceInterface } from "../interfaces/instance.js";
import {
	MonsterFightingInterface,
	monsterStatsEnum,
	statsConst,
} from "../interfaces/monster.js";
import { isOnBoard } from "./instance.js";

const staminaRefill = (instance: instanceInterface) => {
	instance.players.forEach((player) => {
		player.onBoard.forEach((monster) => {
			refillStat()[monsterStatsEnum.STAMINA](
				monster,
				statsConst.STAMINAREFILLONBOARD,
			);
		});
		player.team
			.filter((monster) => !isOnBoard(instance, monster.id))
			.forEach((monster) => {
				refillStat()[monsterStatsEnum.STAMINA](
					monster,
					statsConst.STAMINAREFILLNOTONBOARD,
				);
			});
	});
};

const refillStat = () => {
	const balance = (monster: MonsterFightingInterface, value: number) => {
		if (monster.stats.balance !== monster.starting.balance) {
			monster.stats.balance += value;
			if (monster.stats.balance > monster.starting.balance)
				monster.stats.balance = monster.starting.balance;
		}
	};
	const hp = (monster: MonsterFightingInterface, value: number) => {
		if (monster.stats.hp !== monster.starting.hp) {
			monster.stats.hp += value;
			if (monster.stats.hp > monster.starting.hp)
				monster.stats.hp = monster.starting.hp;
		}
	};
	const stamina = (monster: MonsterFightingInterface, value: number) => {
		if (monster.stats.stamina !== monster.starting.stamina) {
			monster.stats.stamina += value;
			if (monster.stats.stamina > monster.starting.stamina)
				monster.stats.stamina = monster.starting.stamina;
		}
	};

	return { balance, hp, stamina };
};

export { staminaRefill, refillStat };
