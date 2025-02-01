
import { monsterType } from "../interfaces/monster.js";

const getTypeAffinities = (type: monsterType) => {
    const affinities = {
        fire: { fire: 1, mental: 1, neutral: 1 },
        mental: { fire: 1, mental: 1, neutral: 2 },
        neutral: { fire: 1, mental: 1, neutral: 0.5 },
    };
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
            return 1.25;
        }
    });
    return 1;
};

export {
    getTypeAffinities,
    getTypeEfficiency,
    isSTAB
}