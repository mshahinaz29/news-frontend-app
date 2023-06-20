import React from 'react'
import useAuthContext from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { getArticleCategories, getArticleSources } from '../redux/actions/articleAction';
import { savePreferences, getPreference } from '../redux/actions/preferenceAction';
import { useDispatch, useSelector } from 'react-redux';
import InputSelect from '../components/InputSelect';
import InputTag from '../components/InputTag';
import { setPreferredCategories, setPreferredSources, setPreferredAuthors, setLoading } from "../redux/slices/preferenceSlice";
import LoaderSpinner from '../components/LoaderSpinner';
import { Link } from 'react-router-dom';

const Preferences = () => {

    const { user } = useAuthContext();
    const dispatch = useDispatch();    

    const { categories, sources, isLoading } = useSelector((state) => state.articles);

    const { preferred_categories, preferred_sources, preferred_authors, loading } = useSelector((state) => state.preference);

    const onInputChange = (data) => {
        const { name, value } = data;   
        if(name === 'categories'){
            dispatch(setPreferredCategories(value));
        }else if(name === 'sources'){
            dispatch(setPreferredSources(value));
        }else if(name === 'authors'){
            dispatch(setPreferredAuthors(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePreferences(user));
    }

    useEffect(() => {
        dispatch(getArticleCategories());
        dispatch(getArticleSources());          
    }, [])


    useEffect(() => {
        if(user){
            dispatch(getPreference(user))    
        }       
    }, [user])
    
    return (
        <div>
            { loading ? <LoaderSpinner text='Fetching Preferences...' subtext="Relax and sip some coffee" />
            :
            <form className='mx-auto md:mx-52 mt-10 bg-white p-10' onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-4">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">News Preferences</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Customize your news feed. These settings will be used when filters are not set.</p>

                        <div className="pb-4">

                            <div className="mt-5 space-y-10">
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative gap-x-3">
                                        <label  htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
                                        <InputSelect options={categories} value={preferred_categories} id="categories" getValue={onInputChange}/>
                                    </div>
                                    <div className="relative gap-x-3">
                                        <label  htmlFor="sources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sources</label>
                                        <InputSelect options={sources} value={preferred_sources} id="sources"  getValue={onInputChange} />
                                    </div>
                                    <div className="relative gap-x-3">
                                        <label  htmlFor="sources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authors</label>
                                        <InputTag value={preferred_authors} id="authors" getValue={onInputChange}/>
                                        <small className='text-red-300'>Note: The selected API sources don't support author queries</small>
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div className="flex items-center justify-end gap-x-6">
                    <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
                </div>
            </form>
            }
        </div>
    )
}

export default Preferences