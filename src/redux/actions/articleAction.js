import { setArticles, setLoading, setCategories, setSources, setMeta, setPage } from "../slices/articleSlice";
import axios from "../../api/axios";

export const getArticles = () => {
    return async (dispatch, getState) => {
        const { filter, page } = getState().articles;        
        let filters = filter;
        filters = {...filter, 'page':page};
        // console.log('filters');
        // console.log(filters);
        dispatch(setLoading(true));
        await axios.get('/api/news', {params: filters}).then(response => {    
            if(response.data){
                dispatch(setArticles(response.data.data.articles))
                dispatch(setMeta(response.data.data.meta))
            }                        
        }).catch(err => {
            console.log(err)
        })   
        dispatch(setLoading(false))
    }      
} 

export const getArticleCategories = () => {
    return async (dispatch) => {
        await axios.get('/api/news-categories').then(response => {    
            if(response.data){
                
                dispatch(setCategories(response.data.data.original))
            }                        
        }).catch(err => {
            console.log(err)
        })   
    }      
} 

export const getArticleSources = () => {
    return async (dispatch) => {
        await axios.get('/api/news-sources').then(response => {    
            if(response.data){
                
                dispatch(setSources(response.data.data.original))
            }                        
        }).catch(err => {
            console.log(err)
        })   
    }      
} 