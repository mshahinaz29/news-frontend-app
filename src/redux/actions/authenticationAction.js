import { setUser, logoutUser, selectUser } from "../slices/userSlice";
import axios from "../../api/axios";
export const csrf = () => {
    return async (dispatch) => {
        axios.get("/sanctum/csrf-cookie");
    }
}; 

export const login = ({...data}) => {
    // await csrf();
    // setErrors([])
    return async (dispatch) => {
        // try{
            await csrf();
            const response = await axios.post('/login', data).then(res=> {    
                return Promise.resolve("");
            }).catch(err => {
                console.log(err)
                return Promise.reject(err);
            })  
    }
    
    
}