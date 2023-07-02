import { playerFightingInterface } from "../interfaces/player";
import { initHistoryRound } from "./history.js";
import { speedContest } from "./speedContest.js";
import { applyChanges, buildInstance, clearActions, clearBoardBeforeRound, getPlayerByID, isActionsFilled } from "./instance.js";
import { deathCheck, doAction, effectsType } from "./action.js";
import { getTargeting } from "./targeting.js";
import { passif } from "./passif.js";
import { rollStatus } from "./status.js";
import { actionInterface } from "../interfaces/action.js";
import { instanceInterface } from "../interfaces/instance.js";



const fight = () => {
	let mapFights: instanceInterface[] = [] as any;

	const ready = (matchs: playerFightingInterface[]): instanceInterface => {
		const instance = buildInstance(matchs);
		mapFights.push(instance)
		return instance;
	};

	const waitActions = (actions, playerID, fightID) => {
		const currInstance = getInstanceByID(fightID);
		if (!currInstance) return { status: 3, match: null };
		getPlayerByID(playerID, currInstance).actions = actions;

		if (isActionsFilled(currInstance)) {
			mapFights[fightID] = _playRound(currInstance);
			return {
				status: 2,
				matchInfo: currInstance
			};
		} else
			return {
				status: 1,
				matchInfo: currInstance
			};
	};

	const getInstanceByID = (fightID: string): instanceInterface => {
		return mapFights.find((instance) => instance.id === fightID);
	};

	const _playRound = (instance: instanceInterface): instanceInterface => {
		initHistoryRound(instance)
		clearBoardBeforeRound(instance);
		const sortedListOfMonstersID = speedContest(instance);		
		sortedListOfMonstersID.forEach((monsterID) => {
			doAction(instance, monsterID);
			rollStatus(instance, monsterID);
		});
		applyChanges(instance);
		clearActions(instance);
		console.log(instance.fightInfo.round, instance.fightInfo.history);
		return instance;
	};

	const doSwap = (swapActions: actionInterface[], fightID: string) => {
		const instance = getInstanceByID(fightID)
		for (let index = 0; index < swapActions.length; index++) {
			const action = swapActions[index];

			action.skill.effects.forEach((effect) => {
				const effectTargets = getTargeting(instance, action, effect.targetType);

				effectTargets.forEach((target) => {
					passif(effectsType()[effect.type], target, effect.power, effect.type, instance);
					return !deathCheck(instance, target);
				})
			});
		}
		return { status: 2, matchInfo: instance }
	}

	return { ready, waitActions, doSwap };
};

export default fight;

