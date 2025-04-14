import { actionInterface } from "../interfaces/action.js";
import { instanceInterface } from "../interfaces/instance.js";
import {
	getAlly,
	getEnnemies,
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
						sourceID: actionFromMonster.sourceID,
						targetInfo: {
							targetedPlayerID: monster.playerID,
							spot: player.getSpotByMonsterID(monster.id),
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

		const player = getPlayerByID(
			actionFromMonster.source.playerID,
			instance,
		);
		player.onBoard.forEach((monster) => {
			if (isTargetable(monster)) {
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: actionFromMonster.source.playerID,
						spot: player.getSpotByMonsterID(monster.id),
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
		const player = getPlayerByID(
			actionFromMonster.targetInfo.targetedPlayerID,
			instance,
		);
		player.onBoard.forEach((monster) => {
			if (isTargetable(monster)) {
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: monster.playerID,
						spot: player.getSpotByMonsterID(monster.id),
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
				const player = getPlayerByID(monster.playerID, instance);
				effectListByTarget.push({
					sourceID: actionFromMonster.sourceID,
					targetInfo: {
						targetedPlayerID: monster.playerID,
						spot: player.getSpotByMonsterID(monster.id),
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
		const player = getPlayerByID(
			actionFromMonster.source.playerID,
			instance,
		);
		return [
			{
				sourceID: actionFromMonster.sourceID,
				targetInfo: {
					targetedPlayerID: player.id,
					spot: player.getSpotByMonsterID(actionFromMonster.sourceID),
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
