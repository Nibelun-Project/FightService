import { instanceInterface, playerFightingInterface } from "../interfaces/fight";
import { initHistoryRound } from "./history.js";
import { speedContest } from "./speedContest.js";
import { applyChanges, buildInstance, clearActions, getNewFightId, getPlayerByID, isActionsFilled } from "./instance.js";
import { doAction } from "./action.js";


const fight = () => {
	let mapFights: instanceInterface[] = [] as any;

	const ready = (matchs: playerFightingInterface[]): instanceInterface => {
		const instance = buildInstance(matchs);
		mapFights.push(instance)
		return instance;
	};

	const waitActions = (actions, playerID, fightID) => {
		const currInstance = _getInstanceByID(fightID);
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

	const _getInstanceByID = (fightID: string): instanceInterface => {
		return mapFights.find((instance) => instance.id === fightID);
	};

	const _playRound = (instance: instanceInterface): instanceInterface => {
		initHistoryRound(instance)
		const sortedListOfMonstersID = speedContest(instance);		
		sortedListOfMonstersID.forEach((monsterID) => {
			doAction(instance, monsterID);
		});
		applyChanges(instance);
		clearActions(instance);
		console.log(instance.fightInfo.round, instance.fightInfo.history);
		return instance;
	};

	return { ready, waitActions };
};

export default fight;

