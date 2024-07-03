import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice.js";
// import authSlice from "./AuthSlice";
// import authSlice from "./AuthSlice.js";

const store=configureStore({
    reducer:{
        auth:authSlice
    },
    devTools:true
})

export default store