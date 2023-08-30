import Viewport from "@/model/viewport";
import store from "@/redux/store";
import * as ActivesSliceStuff from '@/redux/simulationSandboxModelSlices/activesSlice';

class ViewportController extends Viewport { 

    grab(active:boolean) {
        let stack = [...store.getState().activesSlice.activeToolsStack];
        let prevAction = stack.pop();
        if (active && prevAction !== ActivesSliceStuff.ActiveTool.DRAG) {
            store.dispatch(ActivesSliceStuff.pushActiveTool(ActivesSliceStuff.ActiveTool.DRAG));
        }
        else if (!active) {
            store.dispatch(ActivesSliceStuff.popActiveTool());
        }
    }

    move(deltaX:number, deltaY:number) {
        let stack = store.getState().activesSlice.activeToolsStack;
        if (stack[stack.length - 1] === ActivesSliceStuff.ActiveTool.DRAG) {
            let coord = this.getCoordinate();
            this.setCoordinate({
                x: coord.x + deltaX,
                y: coord.y + deltaY
            });
        }
    }

    zoom(delta:number) {
        this.setZoomFactor(this.getZoomFactor() + (delta * -0.01));
    }

    useWorld(index:number): void {
        super.setWorld(store.getState().worldSlice[index]);
        store.dispatch(ActivesSliceStuff.setActiveWorld(index));
    }

}

const viewportController = new ViewportController();
export default viewportController;