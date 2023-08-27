import { createSlice } from '@reduxjs/toolkit';
import { Lifeform_SpreadStrategy } from '@/model/lifeform';

export const lifeformSpreadStrategiesSlice = createSlice({
    name: 'lifeformSpreadStrategies',
    initialState: new Array<Lifeform_SpreadStrategy>(),
    reducers: {
        add: (state, action:{payload:Lifeform_SpreadStrategy}) => {
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
export const { add, removeIndex, removeAll } = lifeformSpreadStrategiesSlice.actions;
export default lifeformSpreadStrategiesSlice.reducer;