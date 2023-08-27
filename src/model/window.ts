export enum RenderQuality { LOWEST, LOW, MEDIUM, HIGH, HIGHEST };

class Window {

    private zoomFactor = 1;
    private coordinateX = 0;
    private coordinateY = 0;
    private rotation = 0;
    private renderQuality = RenderQuality.MEDIUM;

}

export default new Window();