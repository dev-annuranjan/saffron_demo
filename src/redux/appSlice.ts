import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        quizTaken: false,
        prevPage: 0,
        pageNumber: 0
    },
    reducers: {
        setQuizTakenState: (state, action) => {
            state.quizTaken = action.payload;
        },
        setPageNumber: (state, action) => {
            state.prevPage = state.pageNumber;
            state.pageNumber = action.payload;
        }
    }
});

export const { setQuizTakenState, setPageNumber } = appSlice.actions;
export default appSlice.reducer;
