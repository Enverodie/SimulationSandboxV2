import { Coordinate } from "./positions";
import World from "./world";

export enum RenderQuality { LOWEST, LOW, MEDIUM, HIGH, HIGHEST };

class Viewport {

    private zoomFactor = 1;
    private coordinateX = 0;
    private coordinateY = 0;
    private rotation = 0;
    private renderQuality = RenderQuality.MEDIUM;

    protected world:World|null = null;

    getZoomFactor(): number {
        return this.zoomFactor;
    }

    setZoomFactor(newNumber:number): boolean {
        this.zoomFactor = newNumber;
        return true;
    }

    getCoordinate(): Coordinate {
        return { x: this.coordinateX, y: this.coordinateY };
    }

    protected setCoordinateX(newX: number): boolean {
        this.coordinateX = newX;
        if (this.world !== null) {
            this.world = this.world as World;
            this.coordinateX = Math.min(Math.max(this.coordinateX, -this.world.spanX), this.world.spanX);
        } 
        return true;
    }

    protected setCoordinateY(newY: number): boolean {
        this.coordinateY = newY;
        if (this.world !== null) {
            this.world = this.world as World;
            this.coordinateY = Math.min(Math.max(this.coordinateY, -this.world.spanY), this.world.spanY);
        }
        return true;
    }

    setCoordinate(coord:Coordinate) {
        this.setCoordinateX(coord.x);
        this.setCoordinateY(coord.y);
    }

    getRotation(): number {
        return this.rotation;
    }

    setRotation(degrees:number) {
        this.rotation = degrees;
    }

    setRenderQuality(quality:RenderQuality) {
        this.renderQuality = quality;
    }

    getRenderQuality(): RenderQuality {
        return this.renderQuality;
    }

    protected setWorld(world:World) {
        this.world = world;
    }

}

export default Viewport;