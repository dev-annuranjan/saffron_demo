import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        score: 0,
        totalScore: 0,
        questionOrder: [],
        optionsOrder: [],
        optionsChosen: []
    },
    reducers: {
        setScore: (state, action) => {
            state.score = action.payload;
        },
        setTotalScore: (state, action) => {
            state.totalScore = action.payload;
        },
        setQuestionOrder: (state, action) => {
            state.questionOrder = action.payload;
        },
        setOptionsOrder: (state, action) => {
            state.optionsOrder = action.payload;
        },
        setOptionsChosen: (state, action) => {
            state.optionsChosen = action.payload;
        }
    }
});

export const { setScore, setTotalScore, setQuestionOrder, setOptionsOrder, setOptionsChosen } = quizSlice.actions;
export default quizSlice.reducer;