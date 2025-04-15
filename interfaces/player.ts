import { MonsterFightingInterface } from "./monster.js";
import { actionInterface } from "./action.js";
import { hasStatusFromList } from "../controller/status.js";
import { preventToPlayRound } from "./status.js";
import { isSkillHighPriority } from "../controller/skill.js";
import {
	convertActionToHistory,
	convertMonsterToHistory,
	updateHistory,
} from "../controller/history.js";
import { fightInfoInterface, historyContextEnum } from "./history.js";

class playerFighting {
	private _id: string;
	private _onBoard?: MonsterFightingInterface[] = [];
	private _team?: MonsterFightingInterface[] = [];
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

	public get onBoard(): MonsterFightingInterface[] {
		return this._onBoard;
	}
	public set onBoard(onBoard: MonsterFightingInterface[]) {
		this._onBoard = onBoard;
	}

	public get team(): MonsterFightingInterface[] {
		return this._team;
	}
	public set team(team: MonsterFightingInterface[]) {
		this._team = team;
	}

	public get actions(): actionInterface[] {
		return this._actions;
	}
	public set actions(actions: actionInterface[]) {
		this._actions = actions;
	}

	public getOnBoardMonsterByID = (id: string): MonsterFightingInterface => {
		return this.getMonsterByID(id, this.onBoard);
	};
	public getTeamMonsterByID = (id: string): MonsterFightingInterface => {
		return this.getMonsterByID(id, this.team);
	};
	private getMonsterByID = (
		id: string,
		list: MonsterFightingInterface[],
	): MonsterFightingInterface => {
		const monster = list.find((monster) => monster.id === id);
		return monster != undefined
			? monster
			: ({} as MonsterFightingInterface);
	};

	public getMonsterBySpot = (spot: number): MonsterFightingInterface => {
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
		fightInfo: fightInfoInterface,
		monster: MonsterFightingInterface,
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

		updateHistory(fightInfo, {
			context: historyContextEnum.PLAYROUND,
			content: {
				isAvailableToPlayRound: isAvailableToPlayRound,
				monster: convertMonsterToHistory(monster),
				action: convertActionToHistory(action),
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
}

export { playerFighting };
