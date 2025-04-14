import { actionInterface } from "../interfaces/action.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	getAlly,
	getEnnemies,
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
						source: actionFromMonster.source,
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
				source: actionFromMonster.source,
				target: ally,
				skill: actionFromMonster.skill,
			},
		];
	};

	const allies = (): actionInterface[] => {
		const effectListByTarget = [];
		getPlayerByID(
			actionFromMonster.source.playerID,
			instance,
		).onBoard.forEach((monster) => {
			if (isTargetable(monster)) {
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: actionFromMonster.source.playerID,
						spot: getSpotByMonsterID(instance, monster.id),
					},
					source: actionFromMonster.source,
					target: monster,
					skill: actionFromMonster.skill,
				});
			}
		});

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
					source: actionFromMonster.source,
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
					source: actionFromMonster.source,
					target: monster,
					skill: actionFromMonster.skill,
				});
			}
		});

		return effectListByTarget;
	};

	const self = (): actionInterface[] => {
		if (!isTargetable(actionFromMonster.source)) return [];
		return [
			{
				sourceID: actionFromMonster.sourceID,
				targetInfo: {
					targetedPlayerID: getPlayerByID(
						actionFromMonster.source.playerID,
						instance,
					).id,
					spot: getSpotByMonsterID(
						instance,
						actionFromMonster.sourceID,
					),
				},
				source: actionFromMonster.source,
				target: actionFromMonster.source,
				skill: actionFromMonster.skill,
			},
		];
	};

	const single = (): actionInterface[] => {
		const targetedPlayer = getPlayerByID(
			actionFromMonster.targetInfo.targetedPlayerID,
			instance,
		);
		let target = targetedPlayer.getMonsterBySpot(
			actionFromMonster.targetInfo.spot,
		);
		if (!isTargetable(target)) {
			// if spot is empty
			actionFromMonster.targetInfo.spot = getOtherSpot(
				actionFromMonster.targetInfo.spot,
			); // get the other spot
			target = targetedPlayer.getMonsterBySpot(
				actionFromMonster.targetInfo.spot,
			);
			if (!isTargetable(target)) return []; // if empty too return []

			return [
				{
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: target.playerID,
						spot: actionFromMonster.targetInfo.spot,
					},
					source: actionFromMonster.source,
					target: target,
					skill: actionFromMonster.skill,
				},
			];
		}

		return [
			{
				sourceID: actionFromMonster.sourceID,
				targetInfo: actionFromMonster.targetInfo,
				source: actionFromMonster.source,
				target: target,
				skill: actionFromMonster.skill,
			},
		];
	};

	const singleBackstage = (): actionInterface[] => {
		return [
			{
				sourceID: actionFromMonster.sourceID,
				targetInfo: actionFromMonster.targetInfo,
				source: actionFromMonster.source,
				targetTeam: getPlayerByID(
					actionFromMonster.source.playerID,
					instance,
				).team,
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
