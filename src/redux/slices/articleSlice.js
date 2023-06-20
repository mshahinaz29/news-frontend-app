import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const initialFilterState = {
    keyword: null,
    from_date: null, //get last year
    to_date: null,
    sources: [],
    categories: []
}

const initialState = {
    articles: null,
    meta: {},
    categories: [],
    sources: [],
    isLoading: false,
    errors: [],
    page: 1,
    filter: {...initialFilterState}
};

export const articleSlice = createSlice({
    name: "articles",
    initialState: initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSources: (state, action) => {
            state.sources = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setMeta: (state, action) => {
            state.meta = action.payload;
        },
        setFilter: (state, action) => {
            const {
                name, // string
                value // string or integer
            } = action.payload;

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [name]: value
                }
            };
        },
    }
});

export const { setArticles, setLoading, setFilter, setCategories, setSources, setPage, setMeta } = articleSlice.actions


export default articleSlice.reducer;