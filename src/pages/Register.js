import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios.js'
import useAuthContext from '../context/AuthContext.js';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [password_confirmation, setPasswordConfirmation] = useState("");
    
    const { register, errors } = useAuthContext();
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        register({name, email, password, password_confirmation})
    }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleRegister}>
            <div className='m-0'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Name
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        type="text"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name && 
                        <div className='flex'>
                            <span className='text-red-400 text-sm '>{errors.name[0]}</span>
                        </div>
                    }
                </div>
            </div>

            <div className='m-0'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && 
                        <div className='flex'>
                            <span className='text-red-400 text-sm'>{errors.email[0]}</span>
                        </div>
                    }
                    
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && 
                    <div className='flex'>
                        <span className='text-red-400 text-sm'>{errors.password[0]}</span>
                    </div>}
                    
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password Confirmation
                </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Register
                </button>
            </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login here
            </Link>
            </p>
        </div>
    </div>
  )
}

export default Register