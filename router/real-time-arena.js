const express = require('express');
const cookieParser = require("cookie-parser");
const { launchFight } = require('../controller/fight');

const router = express.Router()
router.use(cookieParser());

const COOKIE_FIGHT_ID = "fightId";

router.post("/launch", (req, res) => {
    fight = launchFight(req.body);
    res.cookie(COOKIE_FIGHT_ID, fight.id);
    res.json({"msg": "fight n° " + fight.id + " started"});
});
module.exports = router;