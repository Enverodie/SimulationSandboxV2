import { configureStore } from "@reduxjs/toolkit";
import worldSlice from "./simulationSandboxModelSlices/worldSlice";
import lifeformTemplatesSlice from "./simulationSandboxModelSlices/lifeformTemplatesSlice";
import lifeformSpreadConditionsSlice from "./simulationSandboxModelSlices/lifeformSpreadConditionsSlice";
import lifeformSpreadStrategiesSlice from "./simulationSandboxModelSlices/lifeformSpreadStrategiesSlice";
import brushesSlice from "./simulationSandboxModelSlices/brushesSlice";
import activesSlice from "./simulationSandboxModelSlices/activesSlice";

export default configureStore({
    reducer: {
        worldSlice,
        lifeformTemplatesSlice,
        lifeformSpreadConditionsSlice,
        lifeformSpreadStrategiesSlice,
        brushesSlice,
        activesSlice,
    }
})