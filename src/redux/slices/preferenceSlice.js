import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';


const initialState = {
    preferred_authors: [],
    preferred_categories: [],
    preferred_sources: [],
    loading: false,
    errors: [],
};

export const preferenceSlice = createSlice({
    name: "preference",
    initialState: initialState,
    reducers: {        
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPreferredCategories: (state, action) => {
            state.preferred_categories = action.payload;
        },
        setPreferredSources: (state, action) => {
            state.preferred_sources = action.payload;
        },
        setPreferredAuthors: (state, action) => {
            state.preferred_authors = action.payload;
        },
    }
});

export const { setPreferredAuthors, setLoading, setPreferredCategories, setPreferredSources } = preferenceSlice.actions


export default preferenceSlice.reducer;