import React from "react";
import { useState } from "react";
import useAuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"

export default function Dropdown() {
    const [show, setShow] = useState(false);

    const { user, logout, loading } = useAuthContext()

    const toggleDropdown = () => {
        setShow(!show)
    }

    const handleLogout = () => {
        setShow(!show)
        logout()
    }

    

    return (
        <div className="inline-flex rounded-full">
            <div className="relative">
                
                <button onClick={toggleDropdown} type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" alt="" />
                </button>

                {show ? <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                    <div className="p-2">
                        <Link
                              to="/preferences"
                              onClick={toggleDropdown}
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                            Preferences
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                        >
                            Logout
                        </button>
                    </div>
                </div> : ''}
            </div>
        </div>
    );
}
