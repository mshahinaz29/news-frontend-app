import { setUser } from "../slices/userSlice";
import axios from "../../api/axios";

export const getUser = () => {
    return async (dispatch) => {
        await axios.get('/api/user').then(response => {    
            if(response.data){
                setUser(response.data);
            }            
            
        }).catch(err => {
            console.log(err)
        }) 
    }      
}    