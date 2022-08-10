import express from "express";
import { fightStatus } from "../controller/response.js";

const combatRouter = (communicationInstance) => {
	const router = express.Router();
	router.get("/", (req, res) => {
		res.send("accessing the fight router");
	});

	router.post("/ready", (req, res) => {
		if (req.body.playerID) {
			const controllerRes = fightStatus(
				communicationInstance.init(req.body.playerID, req.body.socketID)
			);
			res.status(controllerRes.status).send(controllerRes.message);
		} else res.status(400).send("Missing arguments");
	});

	router.post("/actions", (req, res) => {
		if (req.body.actions && req.body.playerID && req.body.fightID) {
			const controllerRes = fightStatus(
				communicationInstance.actions(
					req.body.actions,
					req.body.playerID,
					req.body.fightID
				)
			);
			res.status(controllerRes.status).send(controllerRes.message);
		} else res.status(400).send("Missing arguments");
	});

	return router;
};

export default combatRouter;
