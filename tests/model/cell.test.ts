import Cell from "../../src/model/cell";
import Positions from "../../src/model/positions";
import { lifeform, world1 } from './templatesForTesting';

describe("cell object static members", () => {

    test("Testing getCoordinateWithOffset I", () => {
        expect(Cell.getCoordinateWithOffset({x: 5, y: 2}, {x: 1, y: 1})).toEqual({x: 6, y:3});
    });
    test("Testing getCoordinateWithOffset II", () => {
        let coord = {x: 5, y: 2};
        expect(Cell.getCoordinateWithOffset(coord, {x: 1, y: 1})).not.toBe(coord);
    });

});

describe("cell object instantiation", () => {

    let cell = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
    let cell2 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
    let cell3 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);

    world1.generation.addPosition({x:0, y:0}, cell);
    world1.generation.addPosition({x:2, y:0}, cell2);
    world1.generation.addPosition({x:-2, y:0}, cell3);
    
    for (let i = 0; i <= lifeform.ticksBetweenGenerations; i++) {
        
        test(`cell remains the same until next generation ${i+1}`, () => {
            let stagingArea = new Positions<Cell[]>();
            cell.stageNextGeneration({x: 0, y:0}, stagingArea, world1.generation);
            expect(stagingArea.getAllPositions()).toEqual([
                [{x:0, y:0}, [cell]]
            ]);
        });

    }

    let stagingArea = new Positions<Cell[]>();
    test("the cell should be ready for the next generation", () => {
        expect(cell.ticksUntilNextGeneration).toBe(0);
    });
    test("the cell's generation counter should be reset", () => {
        cell.stageNextGeneration({x: 0, y:0}, stagingArea, world1.generation);
        expect(cell.ticksUntilNextGeneration).toBe(cell.lifeform.ticksBetweenGenerations - 1);
    })

    test("cell properly expands on next generation: keys", () => {
        expect(stagingArea.getAllKeys()).toEqual([
            {x:-1, y:-1},
            {x:1, y:-1},
            {x:1, y:1},
            {x:-1, y:1},
        ]);
    });

    test("cell properly expands on next generation: values", () => {
        expect(stagingArea.getAllValues()).toEqual([
            [new Cell(cell.lifeform, cell.lifeform.spreadStrategies[0].newCellStrength, cell.lifeform.spreadStrategies[0].sproutInGenerations)],
            [new Cell(cell.lifeform, cell.lifeform.spreadStrategies[0].newCellStrength, cell.lifeform.spreadStrategies[0].sproutInGenerations)],
            [new Cell(cell.lifeform, cell.lifeform.spreadStrategies[0].newCellStrength, cell.lifeform.spreadStrategies[0].sproutInGenerations)],
            [new Cell(cell.lifeform, cell.lifeform.spreadStrategies[0].newCellStrength, cell.lifeform.spreadStrategies[0].sproutInGenerations)],
        ]);
    });

})