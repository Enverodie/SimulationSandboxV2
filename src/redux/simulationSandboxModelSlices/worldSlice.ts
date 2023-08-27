/**
 * The idea here is that all the class instances needed to store 
 * data about the state of simulation sandbox, particularly
 * ones that need to be instantiated by the user, can be
 * stored here for the controller to use later.
 */

import { createSlice } from '@reduxjs/toolkit';
import World from '@/model/world';

export const worldSlice = createSlice({
    name: 'world',
    initialState: new Array<World>(),
    reducers: {
        add: (state, action:{payload:World}) => {
            state.push(action.payload);
        },
        removeIndex: (state, action:{payload:number}) => {
            state.splice(action.payload, 1);
        },
        removeAll: (state) => {
            state.length = 0;
        }
    }
});
export const { add, removeIndex, removeAll } = worldSlice.actions;
export default worldSlice.reducer;