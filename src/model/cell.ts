import { DEFAULT_STARTER_STRENGTH, DEFAULT_TIME_TO_SPROUT } from "./globalVars";
import Lifeform from "./lifeform";
import Positions, { Coordinate } from "./positions";

export default class Cell {

    lifeform: Lifeform;
    strength: number;
    ticksUntilNextGeneration: number;
    ticksUntilSprout: number;

    stageNextGeneration(coord:Coordinate, stagingArea:Positions<Cell[]>) { // TODO: Finish this method
        if (this.ticksUntilSprout === 0) { // happy birthday!
            // add this cell to the pool
            stagingArea.getPosition(coord)?.push(this);
        }
        else if (this.ticksUntilSprout < 0) { // is alive
            if (this.ticksUntilNextGeneration > 0) { 
                // the cell only potentially dies when the next generation begins
                stagingArea.getPosition(coord)?.push(this);
            }
            else if (this.ticksUntilNextGeneration === 0) { // the next generation is ready to be born
                // add all cells that meet all the criteria to the pool
                
            }
            if (this.ticksUntilNextGeneration === 0) this.ticksUntilNextGeneration = this.lifeform.ticksBetweenGenerations;
            // ^ it's potentially unlikely that this cell will survive to the next generation, but it's still a good idea to reset it
            this.ticksUntilNextGeneration--; // reset once zero
        }
        this.ticksUntilSprout--;
    }

    /**
     * Cells manifest the role of a lifeform but ultimately 
     * carry out its tasks on an individual basis. Each cell keeps
     * track of it's "plan" for continuing into the next stages and
     * will attempt to do so.
     * @param lifeform The cell's style of living
     * @param strength the power the cell has to remain in position until the next generation even with competition
     * @param sproutInGenerations the number of generations to wait before the cell comes to life, where 0 is it will come to life the next chance it gets. Cannot be < 0
     */
    constructor(lifeform: Lifeform, strength:number = DEFAULT_STARTER_STRENGTH, sproutInGenerations:number = DEFAULT_TIME_TO_SPROUT) {
        this.lifeform = lifeform;
        this.strength = strength;
        this.ticksUntilNextGeneration = this.lifeform.ticksBetweenGenerations;
        if (sproutInGenerations < 0) console.warn("Error in Cell constructor: argument to 'sproutInGenerations' not in range [0,n). Closest value inserted.")
        this.ticksUntilSprout = Math.max(sproutInGenerations, 0);
    }
}