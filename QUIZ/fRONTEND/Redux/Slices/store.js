import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice.js";
import QuizSlice from "./QuizSlice.js";
// import authSlice from "./AuthSlice";
// import authSlice from "./AuthSlice.js";

const store=configureStore({
    reducer:{
        auth:authSlice,
        quiz:QuizSlice
    },
    devTools:true
})

export default store