import { DEFAULT_LIFEFORM_STRENGTH, DEFAULT_TIME_TO_SPROUT } from "./globalVars";
import Lifeform, { IgnoreLifeformOptions } from "./lifeform";
import Positions, { Coordinate } from "./positions";

export default class Cell {

    lifeform: Lifeform;
    strength: number;
    ticksUntilNextGeneration: number;
    ticksUntilSprout: number;

    static getCoordinateWithOffset(coord:Coordinate, offset:Coordinate): Coordinate {
        return { x: coord.x + offset.x, y: coord.y + offset.y };
    }

    stageNextGeneration(coord:Coordinate, stagingArea:Positions<Cell[]>, currentGen:Positions<Cell>): void { // TODO: Finish this method
        if (this.ticksUntilSprout === 0) { // happy birthday!
            // add this cell to the pool
            if (stagingArea.getPosition(coord) === null) stagingArea.addPosition(coord, []);
            (stagingArea.getPosition(coord) as Cell[]).push(this);
        }
        else if (this.ticksUntilSprout < 0) { // is alive
            if (this.ticksUntilNextGeneration > 0) { 
                // the cell only potentially dies when the next generation begins
                if (stagingArea.getPosition(coord) === null) stagingArea.addPosition(coord, []);
                (stagingArea.getPosition(coord) as Cell[]).push(this);
            }
            else if (this.ticksUntilNextGeneration === 0) { // the next generation is ready to be born
                // add all cells that meet all the criteria to the pool
                for (let strategy of this.lifeform.spreadStrategies) {
                    let condition = strategy.condition;
                    let localNeighborhood = condition.positions.getAllKeys();
                    let absoluteNeighborhood = localNeighborhood.map(localCoord => {return {x: coord.x + localCoord.x, y: coord.y + localCoord.y}})
                    for (let absoluteNeighborhoodPosition of absoluteNeighborhood) {
                        let qualifyingCells = 0;
                        for (let testedPosition of localNeighborhood) {
                            let cellAtCheckedPosition = currentGen.getPosition(Cell.getCoordinateWithOffset(absoluteNeighborhoodPosition, testedPosition));
                            if (cellAtCheckedPosition === null) continue;

                            let isCorrectLifeform:boolean = condition.ignoreLifeforms === IgnoreLifeformOptions.NONE;

                            // if ignoring every other lifeform
                            isCorrectLifeform = isCorrectLifeform || condition.ignoreLifeforms === IgnoreLifeformOptions.ALL && cellAtCheckedPosition.lifeform.name === this.lifeform.name;

                            // if ignoring only some lifeforms
                            isCorrectLifeform = isCorrectLifeform || (Array.isArray(condition.ignoreLifeforms) && condition.ignoreLifeforms[0] instanceof Lifeform && !(condition.ignoreLifeforms as Lifeform[]).some((value) => value.name === (cellAtCheckedPosition as Cell).lifeform.name));

                            if (isCorrectLifeform) qualifyingCells++;
                        }
                        if (condition.amountRequiredAlive.isWithin(qualifyingCells)) {
                            for (let strategyPosition of strategy.positions.getAllKeys()) {
                                let newCoordinate = Cell.getCoordinateWithOffset(absoluteNeighborhoodPosition, strategyPosition);
                                if (stagingArea.getPosition(newCoordinate) === null) stagingArea.addPosition(newCoordinate, []);
                                (stagingArea.getPosition(newCoordinate) as Cell[]).push(new Cell(this.lifeform, this.lifeform.defaultStrength, strategy.sproutInGenerations));
                            }
                        }
                    }
                }
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
    constructor(lifeform: Lifeform, strength:number = lifeform.defaultStrength, sproutInGenerations:number = DEFAULT_TIME_TO_SPROUT) {
        this.lifeform = lifeform;
        this.strength = strength;
        this.ticksUntilNextGeneration = this.lifeform.ticksBetweenGenerations;
        if (sproutInGenerations < 0) console.warn("Error in Cell constructor: argument to 'sproutInGenerations' not in range [0,n). Closest value inserted.")
        this.ticksUntilSprout = Math.max(sproutInGenerations, 0);
    }
}