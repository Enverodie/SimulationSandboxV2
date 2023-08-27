import World from "@/model/world";
import store from "@/redux/store";
import * as WorldSliceFunctions from "@/redux/simulationSandboxModelSlices/worldSlice";

class WorldController {

    /**
     * 
     * @param name The name of the new world
     * @param spanX The max positive direction any cells can expand into
     * @param spanY The max positive direction any cells can expand into
     * @returns {} index - the position in the store array this world is stored at; world - the newly created world
     */
    createNewWorld(name:string, spanX:number, spanY:number): {index:number, world:World} {
        let world = new World(name, spanX, spanY);
        let index = store.getState().worldSlice.length;
        store.dispatch(WorldSliceFunctions.add(world));
        return { index, world };
    }

    prepNextGeneration() {
        
    }
}
export default new WorldController();