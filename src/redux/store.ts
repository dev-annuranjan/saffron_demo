import { configureStore } from "@reduxjs/toolkit";
import QuizSlice from "./quizSlice"
import AppSlice from "./appSlice";

const store = configureStore({
    reducer: {
        quiz: QuizSlice,
        app: AppSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;