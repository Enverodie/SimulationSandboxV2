// Responsible for all the different brushes to place and delete cells
import { Brush_Shapes, matchWithTexture } from "@/model/brush"
import Lifeform from "@/model/lifeform";
import Positions, { Coordinate } from "@/model/positions";
import Cell from "@/model/cell";
import * as BrushesSliceFunctions from '@/redux/simulationSandboxModelSlices/brushesSlice';
import store from "@/redux/store";

class BrushController {
    
    getSize(): number {
        return store.getState().brushesSlice.brushOptions.size;
    }

    setSize(size:number): void {
        store.dispatch(BrushesSliceFunctions.setSize(size));
    }

    getBrushShape(): Brush_Shapes {
        return store.getState().brushesSlice.brushOptions.shape;
    }

    setBrushShape(shape:Brush_Shapes) {
        store.dispatch(BrushesSliceFunctions.setShape(shape));
    }

    setRandomBrushProbability(probability:number) {
        store.dispatch(BrushesSliceFunctions.setRandomBrushProbability(probability));
    }
    
    getRandomBrushProbability(): number {
        return store.getState().brushesSlice.brushOptions.probability;
    }

    setActiveBrushTexture(name:string): void {
        if (Object.keys(matchWithTexture).includes(name)) store.dispatch(BrushesSliceFunctions.setActive(matchWithTexture[name]));
        else console.warn(`${name} is not an available brush. Brush not changed.`);
    }

    getActiveBrushTextureName(): string {
        return store.getState().brushesSlice.inActiveTexture.name;
    }

    getAllBrushTextureNames(): string[] {
        return Object.keys(matchWithTexture);
    }

    private isWithinSize(coord:Coordinate):boolean {
        let size = this.getSize();
        switch(this.getBrushShape()) {
            case Brush_Shapes.CIRCLE:
                return Math.abs(coord.x) <= size && Math.abs(coord.y) <= Math.ceil(Math.sqrt(size**2 - coord.x**2));
            case Brush_Shapes.SQUARE:
                return Math.abs(coord.x) <= size && Math.abs(coord.y) <= size;
            default:
                console.error("Shape not recognized.");
                return false;
        }
    }

    draw(lifeform:Lifeform, center:Coordinate, drawTo:Positions<Cell>, drawnOver: Positions<boolean>): void {
        // TODO: there is a way to make this slightly more efficient, but it would create a lot of complexity for different brush shapes
        let size = this.getSize();
        let inActiveTexture = store.getState().brushesSlice.inActiveTexture;
        for (let i = -size; i <= size; i++) {
            for (let j = -size; j <= size; j++) {
                let currentCoord = { x: center.x + i, y: center.y + j };
                if (
                    !drawnOver.getPosition(currentCoord) &&
                    inActiveTexture({coord: currentCoord, size, shape: this.getBrushShape(), probability: this.getRandomBrushProbability()}) && 
                    this.isWithinSize(currentCoord)
                ) drawTo.addPosition(currentCoord, new Cell(lifeform));
                drawnOver.addPosition(currentCoord, true);
            }
        }
    }

}

const brushController = new BrushController();
export default brushController;