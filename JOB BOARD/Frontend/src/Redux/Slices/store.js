import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import internJobSlice from "./JobInternSlice.js"


const store=configureStore({
    reducer:{
       auth:authSlice,
       services:internJobSlice
    },
    devTools:true
})

export default store