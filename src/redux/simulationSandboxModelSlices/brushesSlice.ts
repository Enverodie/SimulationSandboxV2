import { createSlice } from '@reduxjs/toolkit';
import { Brush_Shapes, matchWithTexture } from '@/model/brush';

const brushOptions = {
    shape: Brush_Shapes.CIRCLE,
    size: 1,
    probability: .5,
}

interface InitialState {
    brushOptions: typeof brushOptions,
    inActiveTexture: typeof matchWithTexture[keyof typeof matchWithTexture];
}

const initialState:InitialState = {
    brushOptions,
    inActiveTexture: matchWithTexture.solid
}

export const brushesSlice = createSlice({
    name: 'brushes',
    initialState,
    reducers: {
        setSize(state, action:{payload:number}) {
            state.brushOptions.size = action.payload;
        },

        setShape(state, action:{payload:Brush_Shapes}) {
            state.brushOptions.shape = action.payload;
        },

        setRandomBrushProbability(state, action:{payload:number}) {
            if (action.payload < 0 || action.payload > 1) {
                console.error(`setRandomBrushProbability action.payload = ${action.payload}, required range [0,1]. 1 inserted.`);
                action.payload = 1;
            }
            state.brushOptions.probability = action.payload;
        },

        setActive(state, action:{payload:typeof matchWithTexture[keyof typeof matchWithTexture]}) {
            state.inActiveTexture = action.payload;
        }
    }
});
export const { setSize, setShape, setRandomBrushProbability, setActive } = brushesSlice.actions;
export default brushesSlice.reducer;