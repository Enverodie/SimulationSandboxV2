import { createSlice } from '@reduxjs/toolkit';
import Lifeform from '@/model/lifeform';

export const lifeformTemplatesSlice = createSlice({
    name: 'lifeformTemplates',
    initialState: new Array<Lifeform>(),
    reducers: {
        add: (state, action:{payload:Lifeform}) => {
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
export const { add, removeIndex, removeAll } = lifeformTemplatesSlice.actions;
export default lifeformTemplatesSlice.reducer;