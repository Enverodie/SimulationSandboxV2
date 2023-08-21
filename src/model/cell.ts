import { DEFAULT_STARTER_STRENGTH, DEFAULT_TIME_TO_SPROUT } from "./globalVars";
import Lifeform from "./lifeform";
import Positions, { Coordinate } from "./positions";

export default class Cell {

    lifeform: Lifeform;
    strength: number;
    ticksUntilNextGeneration: number;
    ticksUntilSprout: number;

    stageNextGeneration(coord:Coordinate, stagingArea:Positions<Cell[]>) { // TODO: Finish this method
        this.ticksUntilNextGeneration--; // reset once zero
        this.ticksUntilSprout--;
        if (this.ticksUntilSprout <= 0) { // add this cell to the pool

            if (this.ticksUntilNextGeneration === 0) { // add all cells that meet all the criteria to the pool

            }
        }
        if (this.ticksUntilNextGeneration === 0) this.ticksUntilNextGeneration = this.lifeform.ticksBetweenGenerations;
    }

    /**
     * Cells manifest the role of a lifeform but ultimately 
     * carry out its tasks on an individual basis. Each cell keeps
     * track of it's "plan" for continuing into the next stages and
     * will attempt to do so.
     * @param lifeform The cell's style of living
     * @param strength the power the cell has to remain in position until the next generation even with competition
     * @param sproutInGenerations the number of generations to wait before the cell comes to life
     */
    constructor(lifeform: Lifeform, strength:number = DEFAULT_STARTER_STRENGTH, sproutInGenerations:number = DEFAULT_TIME_TO_SPROUT) {
        this.lifeform = lifeform;
        this.strength = strength;
        this.ticksUntilNextGeneration = this.lifeform.ticksBetweenGenerations;
        this.ticksUntilSprout = sproutInGenerations;
    }
}