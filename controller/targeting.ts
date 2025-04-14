import { actionInterface } from "../interfaces/action.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	getAlly,
	getEnnemies,
	getOnBoardMonsterByID,
	getOtherSpot,
	getPlayerByID,
	getSpotByMonsterID,
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
						sourceID: actionFromMonster.sourceID,
						targetInfo: {
							targetedPlayerID: monster.playerID,
							spot: getSpotByMonsterID(instance, monster.id),
						},
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
				sourceID: actionFromMonster.sourceID,
				targetInfo: {
					targetedPlayerID: ally.playerID,
					spot: actionFromMonster.targetInfo.spot,
				},
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
						sourceID: actionFromMonster.sourceID,
						targetInfo: {
							targetedPlayerID: sourceMonster.playerID,
							spot: getSpotByMonsterID(instance, monster.id),
						},
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
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: monster.playerID,
						spot: getSpotByMonsterID(instance, monster.id),
					},
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
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: monster.playerID,
						spot: getSpotByMonsterID(instance, monster.id),
					},
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
				sourceID: actionFromMonster.sourceID,
				targetInfo: {
					targetedPlayerID: getOnBoardMonsterByID(
						instance,
						actionFromMonster.sourceID,
					).playerID,
					spot: getSpotByMonsterID(
						instance,
						actionFromMonster.sourceID,
					),
				},
				source: self,
				target: self,
				skill: actionFromMonster.skill,
			},
		];
	};

	const single = (): actionInterface[] => {
		const player = getPlayerByID(
			actionFromMonster.targetInfo.targetedPlayerID,
			instance,
		);
		let target = player.getMonsterBySpot(actionFromMonster.targetInfo.spot);
		//DAMIEN VA REVIEW CE MAUVAIS CODE
		if (!isTargetable(target)) {
			// if spot is empty
			actionFromMonster.targetInfo.spot = getOtherSpot(
				actionFromMonster.targetInfo.spot,
			); // get the other spot
			target = player.getMonsterBySpot(actionFromMonster.targetInfo.spot);
			if (!isTargetable(target)) return []; // if empty too return []

			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: target.playerID,
						spot: actionFromMonster.targetInfo.spot,
					},
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
				sourceID: actionFromMonster.sourceID,
				targetInfo: actionFromMonster.targetInfo,
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
				sourceID: actionFromMonster.sourceID,
				targetInfo: actionFromMonster.targetInfo,
				source: source,
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
