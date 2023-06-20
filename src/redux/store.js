import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import articleReducer from "./slices/articleSlice";
import preferenceSlice from "./slices/preferenceSlice";

export default configureStore({
    reducer:{
        user: userReducer,
        articles: articleReducer,
        preference: preferenceSlice
    }
})