import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        value: 3,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { increment, decrement, setValue } = rootSlice.actions;
export default rootSlice.reducer;
