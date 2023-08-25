import Cell from '../../src/model/cell';
import World from '../../src/model/world';
import { lifeform } from './templatesForTesting';

describe('World initialization test', () => {
    
    test('finite world limit I', () => {
        let world = new World('finiteworld', 10, 10, undefined);
        let cell1 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell2 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell3 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell4 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell5 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        world.generation.addPosition({x: 0, y: 0}, cell1);
        world.generation.addPosition({x: 0, y: 10}, cell2);
        world.generation.addPosition({x: 0, y: 11}, cell3);
        world.generation.addPosition({x: 11, y: 10}, cell4);
        world.generation.addPosition({x: 100, y: 5}, cell5);
        expect(world.generation.getAllKeys().sort()).toEqual([
            {x: 0, y: 0},
            {x: 0, y: 10}
        ].sort());
    })

    test('infinite world limit I', () => {
        let world = new World('finiteworld', undefined, undefined, undefined);
        let cell1 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell2 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell3 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell4 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        let cell5 = new Cell(lifeform, lifeform.spreadStrategies[0].newCellStrength, lifeform.spreadStrategies[0].sproutInGenerations);
        world.generation.addPosition({x: 0, y: 0}, cell1);
        world.generation.addPosition({x: 0, y: 10}, cell2);
        world.generation.addPosition({x: 0, y: 11}, cell3);
        world.generation.addPosition({x: 11, y: 10}, cell4);
        world.generation.addPosition({x: 100, y: 5}, cell5);
        expect(world.generation.getAllKeys().sort()).toEqual([
            {x: 0, y: 0},
            {x: 0, y: 10},
            {x: 0, y: 11},
            {x: 11, y: 10},
            {x: 100, y: 5}
        ].sort());
    })
})