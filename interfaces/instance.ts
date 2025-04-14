import { playerFighting } from "./player.js";
import { fightInfoInterface, historyContextEnum } from "./history.js";
import { isAlive } from "../controller/instance.js";
import { updateHistory } from "../controller/history.js";
import { MonsterFightingInterface } from "./monster.js";
import { actionInterface } from "./action.js";

class Instance {
	_id: string;
	_players: playerFighting[] = [];
	_fightInfo: fightInfoInterface = {} as fightInfoInterface;

	constructor(
		id: string,
		players: playerFighting[],
		fightInfo: fightInfoInterface,
	) {
		this.id = id;
		this.players = players;
		this.fightInfo = fightInfo;
	}

	public get id(): string {
		return this._id;
	}
	private set id(id: string) {
		this._id = id;
	}

	public get players(): playerFighting[] {
		return this._players;
	}
	public set players(players: playerFighting[]) {
		this._players = players;
	}

	public get fightInfo(): fightInfoInterface {
		return this._fightInfo;
	}
	public set fightInfo(fightInfo: fightInfoInterface) {
		this._fightInfo = fightInfo;
	}

	public clearBoardBeforeRound = () => {
		this.players.forEach((player) => {
			player.onBoard = player.onBoard.filter((monster) =>
				isAlive(monster),
			);
			player.actions = player.actions.filter((action) =>
				isAlive(player.getOnBoardMonsterByID(action.sourceID)),
			);
		});
	};

	public checkEndgame = (playerID: string) => {
		const playerToCheck = this.getPlayerByID(playerID);
		if (playerToCheck.team.every((monster) => monster.isAlive === false)) {
			this.fightInfo.endgame = true;
			this.fightInfo.winner = this.players.find(
				(player) => player.id != playerID,
			).id;

			updateHistory(this.fightInfo, {
				context: historyContextEnum.ENDGAME,
				content: { winner: this.fightInfo.winner },
			});
		}
	};

	/**
	 * @returns empty array if no ally on board: []
	 */
	public getAlly = (monsterID: string): MonsterFightingInterface => {
		this.players.forEach((player) => {
			if (player.onBoard.some((monster) => monster.id === monsterID)) {
				return player.onBoard.find(
					(monster) => monster.id !== monsterID,
				);
			}
		});
		return {} as MonsterFightingInterface;
	};

	public getEnnemies = (monsterID: string): MonsterFightingInterface[] => {
		this.players.forEach((player) => {
			if (player.onBoard.every((monster) => monster.id !== monsterID)) {
				return player.onBoard;
			}
		});
		return [];
	};

	public getActionByMonsterID = (monsterID: string): actionInterface => {
		this.players.forEach((player) => {
			if (
				player.actions.some((action) => action.sourceID === monsterID)
			) {
				return player.actions.find(
					(action) => action.sourceID === monsterID,
				);
			}
		});
		return {} as actionInterface;
	};

	public getPlayerByID = (playerID: string): playerFighting => {
		return this.players.find((player) => player.id === playerID);
	};

	public getPlayerByMonsterID = (monsterID: string): playerFighting => {
		this.players.forEach((player) => {
			if (player.team.some((monster) => monster.id === monsterID)) {
				return player;
			}
		});
		return {} as playerFighting;
	};
}

export { Instance };
