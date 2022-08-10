const fightStatus = (status) => {
	switch (status) {
		case 0:
			return {
				status: 500,
				message: "Error encountered during the fight calculation",
			};
			break;

		case 1:
			return {
				status: 200,
				message: "Waiting for opponent",
			};
			break;

		case 2:
			return {
				status: 200,
				message: "Action succesfully done",
			};
			break;

		case 3:
			return {
				status: 400,
				message:
					"The action you are tryin to do is impossible : Player already initiated, player not in combat etc...",
			};
			break;
	}
};

export { fightStatus };
