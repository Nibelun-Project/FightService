import express from "express";

const combatRouter = (communicationInstance) => {
	const router = express.Router();
	router.get("/", (req, res) => {
		res.send("accessing the fight router");
	});

	router.post("/ready", (req, res) => {
		if (req.body.playerID)
			res.send(
				communicationInstance.init(req.body.playerID, req.body.socketID)
			);
	});

	router.post("/actions", (req, res) => {
		if (req.body.actions && req.body.playerID && req.body.fightID)
			res.send(
				communicationInstance.actions(
					req.body.actions,
					req.body.playerID,
					req.body.fightID
				)
			);
	});

	return router;
};

export default combatRouter;
