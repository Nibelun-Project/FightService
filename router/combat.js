import express from "express";
const router = express.Router();

import fight from "../controller/fight.js";
const fightModule = fight();

router.post("/ready", (req, res) => {
	if (true) {
		console.log(fightModule.ready(req.body.team));
	} else res.status(400);
	res.status(200);
});

export default router;
