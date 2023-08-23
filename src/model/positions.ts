import World from "./world";

export type Coordinate = { x:number, y:number }

export default class Positions<T> {

    /**
     * This function automatically formats the coordinates to be compatible with
     * the corresponding dictionary key for the dictionary. It is encouraged
     * that you run any coordinate pair through this function before looking up
     * the key in the positions dictionary.
     */
    protected static formatPosition(coord:Coordinate): string {
        let { x, y } = coord;
        return `x${x}y${y}`;
    }

    protected static getCoordinateFromKey(k: string): Coordinate {
        let split = k.split('x')[1].split('y');
        let x = parseInt(split[0]);
        let y = parseInt(split[1]);
        if (isNaN(x)) {
            x = 0
            console.warn(`getCoordinateFromKey(${k}) got NaN as value for x; substituting 0`);
        } 
        if (isNaN(y)) {
            y = 0
            console.warn(`getCoordinateFromKey(${k}) got NaN as value for y; substituting 0`);
        }
        return {x, y};
    }

    private positions: { [key: string]: T };
    world: World|undefined; // we're allowing the world to be undefined as if the positions in such an object just exist in the aether

    positionIsOccupied(coord:Coordinate): boolean {
        if (this.positions.hasOwnProperty(Positions.formatPosition(coord))) return true;
        else return false;
    }

    positionIsInWorld(coord:Coordinate): boolean {
        let { x, y } = coord;
        if (typeof this.world === 'undefined') return true;
        if (x > this.world.spanX || x < -this.world.spanX) return false;
        if (y > this.world.spanY || y < -this.world.spanY) return false;
        return true;
    }

    /**
     * @param x The x coordinate to store the "T" object at
     * @param y The y coordinate to store the "T" object at
     * @param stored The object to store
     * @returns true if successfully stored, false if position already occupied
     */
    addPosition(coord:Coordinate, stored: T): boolean {
        if (this.positionIsOccupied(coord)) return false;
        else if (!this.positionIsInWorld(coord)) return false;
        else {
            this.positions[Positions.formatPosition(coord)] = stored;
            return true;
        }
    }

    /**
     * @param x The x coordinate to remove from
     * @param y The y coordinate to remove from
     * @returns the object stored at that position or null if empty
     */
    removePosition(coord:Coordinate): T | null {
        if (this.positionIsOccupied(coord)) {
            let positionItem = this.positions[Positions.formatPosition(coord)];
            delete this.positions[Positions.formatPosition(coord)];
            return positionItem;
        } 
        else return null;
    }

    /**
     * @param x The x coordinate to get from
     * @param y The y coordinate to get from
     * @returns the object stored at that position or null if empty
     */
    getPosition(coord:Coordinate): T | null {
        if (this.positionIsOccupied(coord)) return this.positions[Positions.formatPosition(coord)];
        else return null;
    }

    getAllPositions(): [key:Coordinate, value:T][] {
        return Object.entries(this.positions).map(([key, value]) => [Positions.getCoordinateFromKey(key), value]);
    }

    getAllKeys(): Coordinate[] {
        return Object.keys(this.positions).map(key => Positions.getCoordinateFromKey(key));
    }

    getAllValues(): T[] {
        return Object.values(this.positions);
    }

    /**
     * Positions guarantees objects of type T a unique, single-occupation of coordinates on an infinite plane.
     * @param world Define the world in order to take on its boundaries
     */
    constructor(world: World | undefined = undefined) {
        this.positions = {};
        this.world = world;
    }
}