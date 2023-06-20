import React from 'react'
import { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'
import { getArticles, getArticleCategories, getArticleSources } from '../redux/actions/articleAction';
import { useDispatch, useSelector } from 'react-redux';
import InputDatepicker from '../components/InputDatepicker';
import InputSelect from '../components/InputSelect';
import { setFilter } from "../redux/slices/articleSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import LoaderSpinner from '../components/LoaderSpinner';
import Article from '../components/Article';
import Pagination from '../components/Pagination';
import { setPage } from "../redux/slices/articleSlice";

const Home = () => {
    const { user, loading } = useAuthContext()
    const { articles, filter, categories, sources, meta, isLoading, page } = useSelector((state) => state.articles);
    const [showFilters, setShowFilters] = useState(false);
    const dispatch = useDispatch();    
   
    const handleFilterClick = () => {
		setShowFilters(!showFilters)
	}

    const handleFormSubmit = (e) => {
        e.preventDefault()        
        dispatch(getArticles());
    }

    const onInputChange = (data) => {
        const { name, value } = data;        
        dispatch(
            setFilter({
                name,
                value: value
            })
        );
        dispatch(setPage(1));
    };

    useEffect(() => {
        dispatch(getArticles());
        dispatch(getArticleCategories());
        dispatch(getArticleSources());        
    }, [])

    return (
        <div className="max-w-7xl mx-auto mt-12">                 
            {isLoading ? <LoaderSpinner text='Fetching Latest News...' subtext="Relax and sip some coffee" />:
            <>
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="ml-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Good day {user?.name}</h2>
                <p className="ml-3 mt-2 text-lg leading-8 text-gray-600">
                    Here's the latest news today                    
                </p>                                        
            </div>
            <div className="bg-white py-8 sm:py-10 mb-3 mt-3">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <form onSubmit={handleFormSubmit}>   
                        <label  htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="text" onChange={(e) => onInputChange(e.target)} id="keyword" name="keyword" value={filter.keyword} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search News" />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <div className="flex justify-end">
                        <button onClick={handleFilterClick} className='outline outline-0 text-indigo-800 btn-sm mt-2 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><FontAwesomeIcon icon={faSliders} /> {showFilters ? 'Hide Filter':'Advance Filter'}</button>
                    </div>  
                {/* filters */}
                {showFilters && <div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-4">
                            <div>
                                <label  htmlFor="from_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date</label>
                                <InputDatepicker value={filter.from_date} id='from_date' getValue={onInputChange} />
                            </div>
                            <div>
                                <label  htmlFor="to_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date</label>
                                <InputDatepicker value={filter.to_date} id='to_date' getValue={onInputChange} />
                            </div>
                            <div>
                                <label  htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <InputSelect options={categories} value={filter.categories} id="categories" getValue={onInputChange}/>
                            </div>
                            <div>
                                <label  htmlFor="sources" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source</label>
                                <InputSelect options={sources} value={filter.sources} id="sources"  getValue={onInputChange} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply Filter</button>
                        </div>                                 
                    </form>
                </div> }    
                </div>         
            </div>       
            
            <div className="bg-white py-10 sm:py-10">                             
                <div className="mx-auto max-w-7xl px-6 lg:px-8">                                         
                    {articles &&
                        <>
                            <Pagination meta={meta} currentPage={page} />
                            <div className='items-center justify-between bg-white px-4 sm:px-6 sm:mt-4'>
                                <label className='text-sm text-gray-700 font-medium mr-2'>Top Stories</label>
                                {filter.keyword && 
                                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 mr-1 py-1 font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{filter.keyword}</span>
                                }   
                                {filter.categories && (
                                    filter.categories.map((category, key) => (
                                        <span key={key} className="inline-flex items-center rounded-md mr-1 bg-purple-50 px-2 py-1 font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{category.value}</span>
                                    ))   
                                )}    
                                {filter.sources && (
                                    filter.sources.map((source, key) => (
                                        <span key={key} className="inline-flex items-center rounded-md mr-1 bg-purple-50 px-2 py-1 font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{source.value}</span>
                                    ))   
                                )}  
                            </div>
                             

                            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 mb-10 sm:mt-4 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {articles.map((article, key) => (
                                <Article article={article} key={key} />
                            ))}
                            </div>

                            <Pagination meta={meta} currentPage={page} />
                        </>
                    }
                </div>
            </div>
            </>
            }
            
            
            {loading ? <LoaderSpinner text='Logging Out' />: ''}
        </div>
    )
}

export default Home