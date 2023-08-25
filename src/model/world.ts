import Cell from "./cell";
import Positions, { Coordinate } from "./positions";
import { MAX_WORLD_SPAN, MIN_WORLD_SPAN } from "./globalVars";

export enum CellEventTypes { DECEASED, PLANTED, SPAWNED };
export type CellEventLog = { coord:Coordinate, tickOnEvent:number, event:CellEventTypes }

export default class World {

    name: string;
    worldTick: number; // TODO: Use this!
    spanX: number;
    spanY: number;
    generation: Positions<Cell>;
    nextGeneration: Positions<Cell>;
    cellSpawnLog: CellEventLog[];
    cellPlantedLog: CellEventLog[];
    cellDeceasedLog: CellEventLog[];
    // TODO: incorporate the logs with the corresponding events
    
    stageNextGeneration() {
        let nextGenerationPrep = new Positions<Cell[]>(this);
        for (let [coord, cell] of this.generation.getAllPositions()) {
            nextGenerationPrep.addPosition(coord, []);
            cell.stageNextGeneration(coord, nextGenerationPrep, this.generation);
        }
        // find all duplicates and calculate best
        for (let [cellArrayCoord, nextGenCellArray] of nextGenerationPrep.getAllPositions()) {
            if (nextGenCellArray.length > 1) {
                let competingLifeforms: {[key: string]: number} = {};
                let strongest:Cell = nextGenCellArray[0];
                for (let c of nextGenCellArray) {
                    // find the strongest cell, then subtract the strengths of all that 
                    // if (typeof competingLifeforms[c.lifeform.name] === 'undefined') competingLifeforms[c.lifeform.name] = 0; // re-enable this if things break
                    competingLifeforms[c.lifeform.name] += c.strength;
                    if (c.strength > strongest.strength) strongest = c; // first-scanned gets equality precedence
                }
                let initialStrongestStrength = strongest.strength;
                let subtractedStrength:number = Object.entries(competingLifeforms).reduce((prev, [currKey, currValue]) => {
                    if (currKey !== strongest.lifeform.name) return prev + currValue;
                    // not standard practice, may not work
                    // TODO: Test this
                    strongest.strength += currValue; // since lifeform is the same, consolidate strength
                    return prev;
                }, 0);
                strongest.strength -= initialStrongestStrength; // this is because we added it to itself in the prior loop
                strongest.strength -= subtractedStrength;
                if (strongest.strength > 0) this.nextGeneration.addPosition(cellArrayCoord, strongest);
            }
            else this.nextGeneration.addPosition(cellArrayCoord, nextGenCellArray[0]);
        }
    }

    pushNewGeneration() {
        this.generation = this.nextGeneration;
        this.nextGeneration = new Positions<Cell>(this);
        this.worldTick++;
    }

    /**
     * The world in which all the cellular automata resides. 
     * Consists of a (potentially infinite) coordinate plane.
     * The world is where all interactions between cells happen;
     * this is where, for example, strengths are processed and final
     * cells are filtered out.
     * @param name The name of the world (in case of multiple worlds)
     * @param spanX The amount the world will span in either horizontal direction
     * @param spanY The amount the world will span in either vertical direction
     * @param positions use this to predefine a set of cells for the world
     */
    constructor(name: string, spanX: number|void = Infinity, spanY: number|void = Infinity, positions: Positions<Cell> | void) {
        this.name = name;
        this.worldTick = 0;
        this.spanX = Math.min(Math.max((spanX as number), MIN_WORLD_SPAN), MAX_WORLD_SPAN);
        this.spanY = Math.min(Math.max((spanY as number), MIN_WORLD_SPAN), MAX_WORLD_SPAN);
        this.generation = positions || new Positions<Cell>(this);
        this.nextGeneration = new Positions<Cell>(this);
        this.generation.world = this;
        this.cellSpawnLog = [];
        this.cellPlantedLog = [];
        this.cellDeceasedLog = [];
    }
}