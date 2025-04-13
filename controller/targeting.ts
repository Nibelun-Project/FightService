import { actionInterface } from "../interfaces/action.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	getAlly,
	getEnnemies,
	getMonsterBySpot,
	getOnBoardMonsterByID,
	getOtherSpot,
	getPlayerByID,
	isTargetable,
} from "./instance.js";

const getTargeting = (
	instance: instanceInterface,
	actionFromMonster: actionInterface,
	effectTargetType: string,
) => {
	const all = (): actionInterface[] => {
		const effectListByTarget = [];

		instance.players.forEach((player) => {
			player.onBoard.forEach((monster) => {
				if (isTargetable(monster)) {
					effectListByTarget.push({
						source: getOnBoardMonsterByID(
							instance,
							actionFromMonster.sourceID,
						),
						target: monster,
						skill: actionFromMonster.skill,
					});
				}
			});
		});
		return effectListByTarget;
	};

	const ally = (): actionInterface[] => {
		const ally = getAlly(instance, actionFromMonster.sourceID);
		if (!isTargetable(ally)) return [];
		return [
			{
				source: getOnBoardMonsterByID(
					instance,
					actionFromMonster.sourceID,
				),
				target: ally,
				skill: actionFromMonster.skill,
			},
		];
	};

	const allies = (): actionInterface[] => {
		const effectListByTarget = [];
		const sourceMonster = getOnBoardMonsterByID(
			instance,
			actionFromMonster.sourceID,
		);

		getPlayerByID(sourceMonster.playerID, instance).onBoard.forEach(
			(monster) => {
				if (isTargetable(monster)) {
					effectListByTarget.push({
						source: getOnBoardMonsterByID(
							instance,
							actionFromMonster.sourceID,
						),
						target: monster,
						skill: actionFromMonster.skill,
					});
				}
			},
		);

		return effectListByTarget;
	};

	const double = (): actionInterface[] => {
		const effectListByTarget = [];
		getPlayerByID(
			actionFromMonster.targetInfo.targetedPlayerID,
			instance,
		).onBoard.forEach((monster) => {
			if (isTargetable(monster)) {
				effectListByTarget.push({
					source: getOnBoardMonsterByID(
						instance,
						actionFromMonster.sourceID,
					),
					target: monster,
					skill: actionFromMonster.skill,
				});
			}
		});

		return effectListByTarget;
	};

	const ennemies = (): actionInterface[] => {
		const effectListByTarget = [];
		const targetsList = getEnnemies(instance, actionFromMonster.sourceID);

		targetsList.forEach((monster) => {
			if (isTargetable(monster)) {
				effectListByTarget.push({
					source: getOnBoardMonsterByID(
						instance,
						actionFromMonster.sourceID,
					),
					target: monster,
					skill: actionFromMonster.skill,
				});
			}
		});

		return effectListByTarget;
	};

	const self = (): actionInterface[] => {
		const self = getOnBoardMonsterByID(
			instance,
			actionFromMonster.sourceID,
		);
		if (!isTargetable(self)) return [];
		return [
			{
				source: self,
				target: self,
				skill: actionFromMonster.skill,
			},
		];
	};

	const single = (): actionInterface[] => {
		let target = getMonsterBySpot(instance, actionFromMonster.targetInfo);
		//DAMIEN VA REVIEW CE MAUVAIS CODE
		if (!isTargetable(target)) {
			// if spot is empty
			actionFromMonster.targetInfo.spot = getOtherSpot(
				actionFromMonster.targetInfo.spot,
			); // get the other spot
			target = getMonsterBySpot(instance, actionFromMonster.targetInfo);
			if (!isTargetable(target)) return []; // if empty too return []

			return [
				{
					source: getOnBoardMonsterByID(
						instance,
						actionFromMonster.sourceID,
					),
					target: target,
					skill: actionFromMonster.skill,
				},
			];
		}

		return [
			{
				source: getOnBoardMonsterByID(
					instance,
					actionFromMonster.sourceID,
				),
				target: target,
				skill: actionFromMonster.skill,
			},
		];
	};

	const singleBackstage = (): actionInterface[] => {
		const source = getOnBoardMonsterByID(
			instance,
			actionFromMonster.sourceID,
		);
		return [
			{
				source: source,
				targetInfo: actionFromMonster.targetInfo,
				targetTeam: getPlayerByID(source.playerID, instance).team,
				skill: actionFromMonster.skill,
			},
		];
	};

	const TargetTypes = {
		all,
		allies,
		ally,
		double,
		ennemies,
		self,
		single,
		singleBackstage,
	};

	return TargetTypes[effectTargetType]();
};

export { getTargeting };
