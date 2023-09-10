import World from '@/model/world';
import store from "@/redux/store";
import { createSlice } from '@reduxjs/toolkit';

const MAX_STACK_SIZE = 5;

// TODO: Will need to add a switch that detects 
// when the canvas is interacted with and use the 
// active tool to direct to the appropriate controller & method
export enum ActiveTool {
    NONE,
    BRUSH,
    ERASE,
    DRAG,
}

interface InitialState {
    world: null|World,
    worldIndex: number,
    activeToolsStack: ActiveTool[],
}

let initialState:InitialState = {
    world: null,
    worldIndex: -1,
    activeToolsStack: []
}

export const activesSlice = createSlice({
    name: 'actives',
    initialState,
    reducers: {
        setActiveWorld(state, action:{payload:number}) {
            let retrieval = store.getState().worldSlice[action.payload];
            if (typeof retrieval !== 'undefined') {
                state.world = retrieval;
                state.worldIndex = action.payload;
                state.activeToolsStack = []
            }
        },

        pushActiveTool(state, action:{payload:ActiveTool}) {
            state.activeToolsStack.push(action.payload);
            while (state.activeToolsStack.length > MAX_STACK_SIZE) state.activeToolsStack.shift();
        },

        popActiveTool(state) {
            state.activeToolsStack.pop();
        }
    }
});

export function getPreviousAction():ActiveTool {
    let stack = store.getState().activesSlice.activeToolsStack;
    return stack[stack.length - 1]; 
}

export const { setActiveWorld, pushActiveTool, popActiveTool } = activesSlice.actions;
export default activesSlice.reducer;