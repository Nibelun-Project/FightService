let mapFights = {};

const getMapFight = () => {
    return mapFights;
};

const setMapFightById = (fightId, playersInfo) => {
    getMapFight.fightId = playersInfo;
};

const getNewFightId = () => {
    //a voir comment les identifier
    return "fid_" + Date.now().toString();
};

exports.launchFight = (playersInfo) => {
    const fightId = getNewFightId();
    setMapFightById(fightId, playersInfo);
    console.log("fight n°", fightId, "started");
    return {"id": fightId};
};