import useAuthContext from "../context/AuthContext"
import { Navigate, Outlet, Link } from "react-router-dom"
import LoaderSpinner from '../components/LoaderSpinner';
import Dropdown from "../components/Dropdown";

const AuthLayout = () => {
    const { user, loading } = useAuthContext()

    return (
      loading ? 
      <LoaderSpinner text={'Authenticating...'} subtext={''}/>:
      (
        user ? 
          <>
          <nav className="bg-indigo-900 text-white px-2 sticky top-0 opacity-100 z-50 sm:px-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                  <Link
                    to="/"
                    className="block rounded py-2 pr-4 pl-3 text-white"
                    aria-current="page">
                      Home
                  </Link>

                  {/* <div className="sm:w-3/4 md:w-3/4 lg:w-3/5 xl:w-3/5">
                      <form>   
                          <label  htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                          <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                              </div>
                              <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search News" required />
                              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                          </div>
                      </form>
                  </div>   */}
                  <div className="hiddnet  md:block md:w-auto" >              
                      <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">                        
                        {user ? 
                        <>
                        <Dropdown />                          
                        </>
                        :
                        <>
                          <li>
                            <Link
                              to="/login"
                              className="block rounded py-2 pr-4 pl-3 text-white"
                              aria-current="page">
                                Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/register"
                              className="block rounded py-2 pr-4 pl-3 text-white"
                              aria-current="page">
                                Register
                            </Link>
                          </li>
                        </>
                        }
                      </ul>                                                                

                        


                  </div>
                </div>
              </nav>
              <Outlet />
          </> 
          : 
          <Navigate to="/login" />
      )
      
    )
    
}

export default AuthLayout