import useAuthContext from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import LoaderSpinner from '../components/LoaderSpinner';

const GuestLayout = () => {
    const { user, loading } = useAuthContext()

    return (
        loading ? 
        <LoaderSpinner text={'Validating...'} subtext={''} /> 
        :
        (!user ? <Outlet /> : <Navigate to="/" />)
    )
}

export default GuestLayout