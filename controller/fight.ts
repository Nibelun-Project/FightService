import { playerFightingInterface } from "../interfaces/player.js";
import { initHistoryRound } from "./history.js";
import { speedContest } from "./speedContest.js";
import {
	applyChanges,
	buildInstance,
	clearBoardBeforeRound,
	getPlayerByID,
	isActionsFilled,
} from "./instance.js";
import { clearActions, doAction, effectsType } from "./action.js";
import { getTargeting } from "./targeting.js";
import { passif } from "./passif.js";
import { actionInterface } from "../interfaces/action.js";
import { instanceInterface } from "../interfaces/instance.js";
import { deathCheckActionTaget } from "./death.js";
import { staminaRefill } from "./monsterStat.js";
import { rollStatusEndRound } from "./status.js";

const fight = () => {
	let mapFights: instanceInterface[] = [] as any;

	const ready = (matchs: playerFightingInterface[]): instanceInterface => {
		const instance = buildInstance(matchs);
		mapFights.push(instance);
		return instance;
	};

	const waitActions = (actions, playerID, fightID) => {
		const currInstance = getInstanceByID(fightID);
		if (!currInstance) return { status: 3, match: null };
		getPlayerByID(playerID, currInstance).actions = actions;

		if (isActionsFilled(currInstance)) {
			mapFights[fightID] = _playRound(currInstance);
			if (currInstance.fightInfo.endgame) {
				return { status: 4, matchInfo: currInstance };
			} else {
				return {
					status: 2,
					matchInfo: currInstance,
				};
			}
		} else
			return {
				status: 1,
				matchInfo: currInstance,
			};
	};

	const getInstanceByID = (fightID: string): instanceInterface => {
		return mapFights.find((instance) => instance.id === fightID);
	};

	const _playRound = (instance: instanceInterface): instanceInterface => {
		initHistoryRound(instance);
		clearBoardBeforeRound(instance);
		const sortedListOfMonstersID = speedContest(instance);
		sortedListOfMonstersID.forEach((monsterID) => {
			doAction(instance, monsterID);
		});
		staminaRefill(instance);
		rollStatusEndRound(instance);
		applyChanges(instance);
		clearActions(instance);
		return instance;
	};

	const doSwap = (
		swapActions: actionInterface[],
		fightID: string,
		playerID: string,
		both: boolean,
	) => {
		const currInstance = getInstanceByID(fightID);
		if (both) getPlayerByID(playerID, currInstance).actions = swapActions;

		for (let index = 0; index < swapActions.length; index++) {
			const action = swapActions[index];

			action.skill.effects.forEach((effect) => {
				const effectTargets = getTargeting(
					currInstance,
					action,
					effect.targetType,
				);

				effectTargets.forEach((target) => {
					passif(
						effectsType()[effect.type],
						target,
						effect,
						currInstance,
					);
					return !deathCheckActionTaget(currInstance, target);
				});
			});
		}
		if (both) {
			if (isActionsFilled(currInstance)) {
				clearActions(currInstance);
				return { status: 2, matchInfo: currInstance };
			} else
				return {
					status: 1,
					matchInfo: currInstance,
				};
		} else {
			return { status: 2, matchInfo: currInstance };
		}
	};

	return { ready, waitActions, doSwap };
};

export default fight;
