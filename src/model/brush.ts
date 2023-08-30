import Cell from "./cell";
import Lifeform from "./lifeform";
import Positions, { Coordinate } from "./positions";

export enum Brush_Shapes {
    CIRCLE,
    SQUARE,
}

export default class Brush {

    shape:Brush_Shapes;
    protected size:number;

    getSize():number {
        return this.size;
    }

    setSize(newSize:number):void {
        this.size = newSize;
    }

    protected isWithinSize(coord:Coordinate):boolean {
        switch(this.shape) {
            case Brush_Shapes.CIRCLE:
                return Math.abs(coord.x) <= this.size && Math.abs(coord.y) <= Math.ceil(Math.sqrt(this.size**2 - coord.x**2));
            case Brush_Shapes.SQUARE:
                return Math.abs(coord.x) <= this.size && Math.abs(coord.y) <= this.size;
            default:
                console.error("Shape not recognized.");
                return false;
        }
    }

    protected isGoodToPlace:((coord: Coordinate) => boolean) = (coord) => {
        return this.isWithinSize(coord);
    }

    /**
     * 
     * @param lifeform The lifeform of the cell to draw
     * @param center The center coordinate for the brush
     * @param drawTo The coordinate plane to spawn the cells on
     * @param drawnOver The coordinate plane to keep track of where the brush has already gone over (so as to not repeat draw within a given timeframe)
     */
    draw(lifeform:Lifeform, center:Coordinate, drawTo:Positions<Cell>, drawnOver: Positions<boolean>) {
        // TODO: there is a way to make this slightly more efficient, but it would create a lot of complexity for different brush shapes
        for (let i = -this.size; i <= this.size; i++) {
            for (let j = -this.size; j <= this.size; j++) {
                let currentCoord = { x: center.x + i, y: center.y + j };
                if (this.isGoodToPlace(currentCoord) && !drawnOver.getPosition(currentCoord)) drawTo.addPosition(currentCoord, new Cell(lifeform));
                drawnOver.addPosition(currentCoord, true);
            }
        }
    }

    constructor(isGoodToPlace:((coord: Coordinate) => boolean)|undefined) {
        this.size = 1;
        this.shape = Brush_Shapes.CIRCLE;
        if (typeof isGoodToPlace !== 'undefined') this.isGoodToPlace = (coord:Coordinate) => {
            return this.isWithinSize(coord) && isGoodToPlace(coord);
        };
    }

}
