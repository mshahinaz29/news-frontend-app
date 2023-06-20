import { setLoading, setPreferredAuthors, setPreferredCategories, setPreferredSources  } from "../slices/preferenceSlice";
import axios from "../../api/axios";

export const getPreference = (user) => {
    return async (dispatch, getState) => {
        
        dispatch(setLoading(true));
        await axios.get('/api/user-preference', {params: {'user_id':user.id}}).then(response => {    
            if(response.data){
                // console.log(response.data)
                dispatch(setPreferredCategories(response.data.categories))
                dispatch(setPreferredSources(response.data.sources))
                dispatch(setPreferredAuthors(response.data.authors))
            }                        
        }).catch(err => {
            console.log(err)
        })   
        dispatch(setLoading(false))
    }      
} 

export const savePreferences = (user) => {
    return async (dispatch, getState) => {
        
        const { preferred_categories, preferred_sources, preferred_authors } = getState().preference;  
        dispatch(setLoading(true))
        await axios.post('/api/user-preference', {
                'user_id': user.id,
                'categories': preferred_categories,
                'sources': preferred_sources, 
                'authors': preferred_authors
            }).then(response => {    
                if(response.data){
                    dispatch(setLoading(false))
                    alert('Successfully updated preferences')
                }                        
            }).catch(err => {
                console.log(err)
            })   
    }      
} 
