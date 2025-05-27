import { playerFighting } from "./player.js";
import { FightInfo, historyContextEnum } from "./history.js";
import { MonsterFighting } from "./monster.js";
import { actionInterface } from "./action.js";

class Instance {
	private _id: string;
	private _players: playerFighting[] = [];
	private _fightInfo: FightInfo = {} as FightInfo;

	constructor(id: string, players: playerFighting[]) {
		this.id = id;
		this.players = players;
		this.fightInfo = new FightInfo();
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

	public get fightInfo(): FightInfo {
		return this._fightInfo;
	}
	public set fightInfo(fightInfo: FightInfo) {
		this._fightInfo = fightInfo;
	}

	public clearBoardBeforeRound = () => {
		this.players.forEach((player) => {
			player.onBoard = player.onBoard.filter(
				(monster) => monster.isAlive,
			);
			player.actions = player.actions.filter(
				(action) =>
					player.getOnBoardMonsterByID(action.sourceID).isAlive,
			);
		});
	};

	public checkEndgame = (playerID: string) => {
		if (this.getPlayerByID(playerID).deathCheckTeam) {
			this.fightInfo.endgame = true;
			this.fightInfo.winner = this.players.find(
				(player) => player.id != player.id,
			).id;

			this.fightInfo.updateHistory({
				context: historyContextEnum.ENDGAME,
				content: { winner: this.fightInfo.winner },
			});
		}
	};

	deathCheckActionTarget = (actionsByTarget: actionInterface): boolean => {
		const player = this.getPlayerByID(
			actionsByTarget.targetInfo.targetedPlayerID,
		);
		if (player.deathCheckActionTarget(this.fightInfo, actionsByTarget)) {
			this.checkEndgame(player.id);
		}
		return false;
	};

	/**
	 * @returns empty array if no ally on board: []
	 */
	public getAlly = (monsterID: string): MonsterFighting => {
		this.players.forEach((player) => {
			if (player.onBoard.some((monster) => monster.id === monsterID)) {
				return player.onBoard.find(
					(monster) => monster.id !== monsterID,
				);
			}
		});
		return {} as MonsterFighting;
	};

	public getEnnemies = (monsterID: string): MonsterFighting[] => {
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

	public isActionsFilled = (): boolean => {
		return this.players.every((player) => player.actions.length > 0);
	};
}

export { Instance };
