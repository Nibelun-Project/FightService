import { MonsterFighting } from "./monster.js";
import { actionInterface } from "./action.js";
import { hasStatusFromList } from "../controller/status.js";
import { preventToPlayRound } from "./status.js";
import { isSkillHighPriority } from "../controller/skill.js";
import { FightInfo, historyContextEnum } from "./history.js";

class playerFighting {
	private _id: string;
	private _onBoard?: MonsterFighting[] = [];
	private _team?: MonsterFighting[] = [];
	private _actions?: actionInterface[] = [];

	constructor(id: string) {
		this.id = id;
	}

	public get id(): string {
		return this._id;
	}
	private set id(id: string) {
		this._id = id;
	}

	public get onBoard(): MonsterFighting[] {
		return this._onBoard;
	}
	public set onBoard(onBoard: MonsterFighting[]) {
		this._onBoard = onBoard;
	}

	public get team(): MonsterFighting[] {
		return this._team;
	}
	public set team(team: MonsterFighting[]) {
		this._team = team;
	}

	public get actions(): actionInterface[] {
		return this._actions;
	}
	public set actions(actions: actionInterface[]) {
		this._actions = actions;
	}

	public getOnBoardMonsterByID = (id: string): MonsterFighting => {
		return this.getMonsterByID(id, this.onBoard);
	};
	public getTeamMonsterByID = (id: string): MonsterFighting => {
		return this.getMonsterByID(id, this.team);
	};
	private getMonsterByID = (
		id: string,
		list: MonsterFighting[],
	): MonsterFighting => {
		const monster = list.find((monster) => monster.id === id);
		return monster != undefined ? monster : ({} as MonsterFighting);
	};

	public getMonsterBySpot = (spot: number): MonsterFighting => {
		return this.onBoard[spot];
	};
	/**
	 * @returns -1 for false
	 */
	public getSpotByMonsterID = (id: string): number => {
		return this.onBoard.findIndex(
			(onBoardMonster) => id === onBoardMonster.id,
		);
	};

	public isOnBoard = (id: string): boolean => {
		return this.onBoard.some((monster) => monster.id === id);
	};

	isAvailableToPlayRound = (
		fightInfo: FightInfo,
		monster: MonsterFighting,
		action: actionInterface,
	): boolean => {
		let isAvailableToPlayRound = true;
		if (
			monster.isAlive === false ||
			monster.stats.hp <= 0 || // the monster is alive
			!this.isOnBoard(monster.id) || // the monster is on the board
			(hasStatusFromList(monster, preventToPlayRound) && //TBD
				!isSkillHighPriority(action))
		) {
			isAvailableToPlayRound = false;
		}

		fightInfo.updateHistory({
			context: historyContextEnum.PLAYROUND,
			content: {
				isAvailableToPlayRound: isAvailableToPlayRound,
				monster: fightInfo.convertMonsterToHistory(monster),
				action: fightInfo.convertActionToHistory(action),
			},
		});

		return isAvailableToPlayRound;
	};

	public applyChanges = () => {
		this.onBoard.forEach((onBoardMonster) => {
			const teamMonsterIndex = this.team.findIndex(
				(teamMonster) => teamMonster.id === onBoardMonster.id,
			);
			this.team[teamMonsterIndex] = onBoardMonster;
		});
	};

	public deathCheckActionTarget = (
		fightInfo: FightInfo,
		actionsByTarget: actionInterface,
	): boolean => {
		if (this.isNeededToCheckDeath(actionsByTarget)) {
			const monster = this.onBoard[actionsByTarget.targetInfo.spot];
			return monster.checkDeath(fightInfo);
		}
		return false;
	};

	public deathCheckTeam = (): boolean => {
		return this.team.every((monster) => monster.isAlive === false);
	};

	private isNeededToCheckDeath = (
		actionsByTarget: actionInterface,
	): boolean => {
		if (actionsByTarget.targetInfo.targetedPlayerID) return true;
		else return false;
	};
}

export { playerFighting };
