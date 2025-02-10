
import { affinities, monsterType, typeConst } from "../interfaces/monster.js";

const getTypeAffinities = (type: monsterType) => {
    return affinities[type.toString()];
};

const getTypeEfficiency = (skillType: monsterType, targetTypes: monsterType[]): number => {
    const affinities = getTypeAffinities(skillType);
    let efficiency = 1;

    targetTypes.forEach((type) => {
        efficiency *= affinities[type];
    });

    return efficiency;
};

const isSTAB = (monsterTypes: monsterType[], skillType: monsterType): number => {
    monsterTypes.forEach((type) => {
        if (type === skillType) {
            return typeConst.STAB;
        }
    });
    return 1;
};

export {
    getTypeAffinities,
    getTypeEfficiency,
    isSTAB
}