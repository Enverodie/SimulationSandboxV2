import { Color } from "./colors";
import { Equality, TICKS_BETWEEN_GENERATIONS } from "./globalVars";
import Positions from "./positions";


// Conditions
export enum IgnoreLifeformOptions { ALL, NONE };
export class Lifeform_SpreadCondition {
    
    isActive: boolean;
    positions: Positions<number>;
    numAliveInPositions: number;
    numAliveOperator: Equality;
    color: Color;
    ignoreLifeforms: IgnoreLifeformOptions.ALL | IgnoreLifeformOptions.NONE | Lifeform[];
    
    /**
     * 
     * @param positions the positions this condition applies to
     * @param color the color this condition will display as
     * @param ignoreLifeforms a list of all the lifeforms this condition will ignore
     */
    constructor(positions: Positions<number>, color: Color, numAliveInPositions:number, numAliveOperator:Equality, ignoreLifeforms: IgnoreLifeformOptions.ALL | IgnoreLifeformOptions.NONE | Lifeform[]) {
        this.isActive = false;
        this.positions = positions;
        this.numAliveInPositions = numAliveInPositions;
        this.numAliveOperator = numAliveOperator;
        this.color = color;
        this.ignoreLifeforms = ignoreLifeforms;
    }
    
};


// Spread
export class Lifeform_SpreadStrategy {
    
    isActive: boolean;
    conditions: Lifeform_SpreadCondition[];
    positions: Positions<number>;
    color: Color;
    newCellStrength: number;
    chance: number;
    sproutInGenerations: number;
    
    /**
     * SpreadStrategy contains all the information relating to ONE way a lifeform can continue to the next generation
     * @param conditions The set of conditions necessary for this spread strategy to take effect
     * @param positions the positions this spread strategy applies to
     * @param color the color this spread strategy will display as
     * @param newCellStrength the determining factor for which of a set of competing cells gets to spawn in a position - must be > 0
     * @param chance the decimal chance a cell will spread to any given position for each position - must be between [0, 1]
     * @param sproutInGenerations the number of this lifeform's generations it takes for the new life to be realized, one is the next generation
     */
    constructor(conditions: Lifeform_SpreadCondition[], positions: Positions<number>, color: Color, newCellStrength: number | undefined, chance: number | undefined, sproutInGenerations: number | undefined) {
        this.isActive = false;
        this.conditions = conditions;
        this.positions = positions;
        this.color = color;
        if (typeof newCellStrength !== 'undefined' && newCellStrength <= 0) console.warn("Error in Lifeform_SpreadStrategy constructor: argument to 'newCellStrength' cannot be <= 0. Using value 1.");
        this.newCellStrength = Math.max((newCellStrength || 100), 1);
        if (typeof chance !== 'undefined' && (chance > 1 || chance < 0)) console.warn("Error in Lifeform_SpreadStrategy constructor: argument to 'chance' not in range [0,1]. Closest value inserted.")
        this.chance = Math.min(Math.max((chance || 1), 0), 1);
        if (typeof sproutInGenerations !== 'undefined' && (sproutInGenerations < 1)) console.warn("Error in Lifeform_SpreadStrategy constructor: argument to 'sproutInGenerations' not in range [1,n). Closest value inserted.")
        this.sproutInGenerations = Math.min(Math.round(sproutInGenerations || 1), 1);
    }
    
};

export default class Lifeform {

    name: string;
    color: Color;
    ticksBetweenGenerations: number;
    spreadConditions: Lifeform_SpreadCondition[];
    spreadStrategies: Lifeform_SpreadStrategy[];

    /**
     * @param name The name of the lifeform
     * @param color The css color the lifeform should be rendered with
     * @param multiplySpeed The speed at which the lifeform advances to the next generation, where 0 is the default
     */
    constructor(name:string, color:Color, spreadConditions:Lifeform_SpreadCondition[], spreadStrategies:Lifeform_SpreadStrategy[], multiplySpeed: number | undefined) {
        this.name = name;
        this.color = color;
        this.spreadConditions = spreadConditions;
        this.spreadStrategies = spreadStrategies;
        this.ticksBetweenGenerations = TICKS_BETWEEN_GENERATIONS - (multiplySpeed || 0);
    }
}