import World from "@/model/world";
import store from "@/redux/store";
import * as WorldSliceFunctions from "@/redux/simulationSandboxModelSlices/worldSlice";
import * as ActivesSliceFunctions from "@/redux/simulationSandboxModelSlices/activesSlice";

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
        store.dispatch(ActivesSliceFunctions.setActiveWorld(index));
        return { index, world };
    }

    deleteActiveWorld() {
        let activeIndex = store.getState().activesSlice.worldIndex;
        if (activeIndex !== -1) store.dispatch(WorldSliceFunctions.removeIndex(activeIndex));
        else console.warn("No active world to delete.");
    }

    deleteAllWorlds() {
        store.dispatch(WorldSliceFunctions.removeAll());
    }

    prepNextGeneration() {
        let activeWorld = store.getState().activesSlice.world;
        if (activeWorld !== null) activeWorld.stageNextGeneration();
        else console.warn("Active world is not set; could not stage next generation.");
    }

    reset() {
        let activeWorld = store.getState().activesSlice.world;
        if (activeWorld !== null) activeWorld.reset();
        else console.warn("Active world is not set; could not reset.");
    }
}

const worldController = new WorldController();
export default worldController;