import Positions from "../../src/model/positions";

describe("position object instantiation", () => {
    let positions = new Positions<number>();
    let positions2 = new Positions<string>();

    test("proper insertion of position number I", () => {
        let x = 2, y = 2, value = 123;
        positions.addPosition({x, y}, value);
        expect(positions.positions[Positions.formatPosition({x,y})]).toBe(value);
    });

    test("proper insertion of position number II", () => {
        let x = 100, y = 2, value = 321;
        positions.addPosition({x, y}, value);
        expect(positions.positions[Positions.formatPosition({x,y})]).toBe(value);
    });

    test("proper insertion of position number III", () => {
        let x = 100, y = 2, value = "hello world";
        positions2.addPosition({x, y}, value);
        expect(positions2.positions[Positions.formatPosition({x,y})]).toBe(value);
    });

});