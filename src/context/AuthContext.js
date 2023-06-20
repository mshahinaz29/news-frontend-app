import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext ({});

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const navigate = useNavigate();

    const getUser = async () => {
        await axios.get('/api/user').then(response => {    
            if(response.data){
                setUser(response.data);
            }            
            
        }).catch(err => {
            console.log(err)
        })   
        setLoading(false);
    }

    const login = async({...data}) => {
        await csrf();
        setErrors([])
        try{
            await axios.post('/login', data).then(response => {                
                alert('success')
                
                navigate("/")
            }).catch(err => {
                if(err.response.status === 422)
                    setErrors(err.response.data.errors)
            })   
            await getUser();                   
        }catch(e){
            if(e.response.status === 422)
                    setErrors(e.response.data.errors)
        }
    }

    const register = async({...data}) => {
        await csrf();
        setErrors([])
        try{
            await axios.post('/register', data).then(response => {                                
                
                navigate("/")
            }).catch(err => {
                if(err.response.status === 422)
                    setErrors(err.response.data.errors)
            })  
            await getUser();                    
        }catch(e){
            if(e.response.status === 422)
                    setErrors(e.response.data.errors)
        }
    }

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
        })
    }

    useEffect(() => {
        if(!user){
            getUser();
        }
    }, [])

    return <AuthContext.Provider value={{ loading, user, errors, getUser, login, register, logout}}>
         {children}
    </AuthContext.Provider>

    
}

export default function useAuthContext() {
    return useContext(AuthContext);
}