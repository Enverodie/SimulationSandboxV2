import { Equality, TICKS_BETWEEN_GENERATIONS } from "./globalVars";
import Positions from "./positions";


// Conditions

/**
 * Stores a set of conditions designed to evaluate as quickly as possible
 */
export class ComplexRange {

    private conditions:([Equality, [number, number|void]])[] = [];

    // NOTE: if anything could use optimizing later, the way these conditions are sorted is one place to look.

    private evaluateAliveCondition(input:number, condition:[Equality, [number, number|void]]): boolean {
        let [operator, numbers] = condition;
        switch(operator) {
            case Equality.LESSTHAN:
                return input < numbers[0];
            case Equality.LESSTHAN_EQUALTO:
                return input <= numbers[0];
            case Equality.EQUALTO:
                return input === numbers[0];
            case Equality.GREATERTHAN_EQUALTO:
                return input >= numbers[0];
            case Equality.GREATERTHAN:
                return input > numbers[0];
            case Equality.BETWEEN_INCLUSIVE:
                if (typeof numbers[1] !== 'undefined') {
                    let number1 = numbers[1] as number;
                    return (input <= numbers[0] && input >= number1);
                }
                console.error("Improper use of addAliveCondition method: no argument provided for right operand in numbers arg");
                return false;
            default:
                console.error("No alive condition can be established with operator " + operator);
                return false;
        }
    }

    /**
     * Prepares the conditions in a proposition relating to the number of cells that should be alive
     * @param operator A logical operator to compare a future input against
     * @param numbers The operands to use from left to right; one if operator requires two operands, two if operator requires three
     */
    addAliveCondition(operator:Equality, numbers:[number, number|void]): ComplexRange {
        this.conditions.push([operator, numbers]);
        return this;
    }

    /**
     * Check if a provided number is in any of the ranges previously provided.
     * @param number The number to test
     * @returns true if the value meets any of the conditions
     */
    isWithin(number:number): boolean {
        // make this function execute as fast as possible.
        for (let condition of this.conditions) if (this.evaluateAliveCondition(number, condition)) return true;
        return false;
    }
}

export enum IgnoreLifeformOptions { ALL, NONE };
export class Lifeform_SpreadCondition {
    
    positions: Positions<boolean>;
    amountRequiredAlive: ComplexRange;
    ignoreLifeforms: IgnoreLifeformOptions.ALL | IgnoreLifeformOptions.NONE | Lifeform[];
    
    /**
     * 
     * @param positions the positions this condition applies to
     * @param color the color this condition will display as
     * @param ignoreLifeforms a list of all the lifeforms this condition will ignore
     */
    constructor(positions: Positions<boolean>, amountRequiredAlive:ComplexRange, ignoreLifeforms: IgnoreLifeformOptions.ALL | IgnoreLifeformOptions.NONE | Lifeform[]) {
        this.positions = positions;
        this.amountRequiredAlive = amountRequiredAlive;
        this.ignoreLifeforms = ignoreLifeforms;
    }
    
};


// Spread
export class Lifeform_SpreadStrategy {
    
    condition: Lifeform_SpreadCondition;
    positions: Positions<boolean>;
    newCellStrength: number;
    chance: number;
    sproutInGenerations: number;
    
    /**
     * SpreadStrategy contains all the information relating to ONE way a lifeform can continue to the next generation
     * @param condition The condition necessary for this spread strategy to take effect
     * @param positions the positions this spread strategy applies to
     * @param color the color this spread strategy will display as
     * @param newCellStrength the determining factor for which of a set of competing cells gets to spawn in a position - must be > 0
     * @param chance the decimal chance a cell will spread to any given position for each position - must be between [0, 1]
     * @param sproutInGenerations the number of this lifeform's generations it takes for the new life to be realized, one is the next generation
     */
    constructor(condition: Lifeform_SpreadCondition, positions: Positions<boolean>, newCellStrength: number | undefined, chance: number | undefined, sproutInGenerations: number | undefined) {
        this.condition = condition;
        this.positions = positions;
        if (typeof newCellStrength !== 'undefined' && newCellStrength <= 0) console.warn("Error in Lifeform_SpreadStrategy constructor: argument to 'newCellStrength' cannot be <= 0. Using value 1.");
        this.newCellStrength = Math.max((newCellStrength || 100), 1);
        if (typeof chance !== 'undefined' && (chance > 1 || chance < 0)) console.warn("Error in Lifeform_SpreadStrategy constructor: argument to 'chance' not in range [0,1]. Closest value inserted.")
        this.chance = Math.min(Math.max((chance || 1), 0), 1);
        if (typeof sproutInGenerations !== 'undefined' && (sproutInGenerations < 0)) console.warn("Error in Lifeform_SpreadStrategy constructor: argument to 'sproutInGenerations' not in range [0,n). Closest value inserted.")
        this.sproutInGenerations = Math.min(Math.round(sproutInGenerations || 0), 0);
    }
    
};

export default class Lifeform {

    name: string;
    ticksBetweenGenerations: number;
    spreadStrategies: Lifeform_SpreadStrategy[];

    /**
     * @param name The name of the lifeform
     * @param color The css color the lifeform should be rendered with
     * @param multiplySpeed The speed at which the lifeform advances to the next generation, where 0 is the default
     */
    constructor(name:string, spreadStrategies:Lifeform_SpreadStrategy[], multiplySpeed: number | undefined) {
        this.name = name;
        this.spreadStrategies = spreadStrategies;
        this.ticksBetweenGenerations = TICKS_BETWEEN_GENERATIONS - (multiplySpeed || 0);
    }
}