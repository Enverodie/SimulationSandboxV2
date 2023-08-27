import { createSlice } from '@reduxjs/toolkit';
import { Lifeform_SpreadCondition } from '@/model/lifeform';

export const lifeformSpreadConditionsSlice = createSlice({
    name: 'lifeformSpreadConditions',
    initialState: new Array<Lifeform_SpreadCondition>(),
    reducers: {
        add: (state, action:{payload:Lifeform_SpreadCondition}) => {
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
export const { add, removeIndex, removeAll } = lifeformSpreadConditionsSlice.actions;
export default lifeformSpreadConditionsSlice.reducer;