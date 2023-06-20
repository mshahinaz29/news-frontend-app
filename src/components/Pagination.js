import { useState, useEffect } from "react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { getArticles  } from '../redux/actions/articleAction';
import { setPage } from "../redux/slices/articleSlice";

export default function Pagination(props) {
  const [active, setActive] = useState(1);  
  const dispatch = useDispatch();   

  const getNearestNumber = (curPage) =>
    {
        const nearest_numbers = [-2,-1,0,1,2,3,4];
        let tempPages = [];
        nearest_numbers.forEach(function(number, i) {
            if((curPage + number) > 0 && tempPages.length < 5){
                tempPages.push(curPage + number);
            }
        });
        return tempPages;
    };
 
    const [pages, setPages] = useState(getNearestNumber(props.currentPage));

    const handleChangePage = (page) => {
        dispatch(setPage(page));
        dispatch(getArticles());
    }

    const next = () => {
        handleChangePage(props.currentPage + 1)
    };
    
    const prev = () => {
        let prev_page = props.currentPage - 1;
        if(prev_page > 0){
            handleChangePage(prev_page)
        }        
    };
    
 
  return (
    <div className="flex items-center justify-between bg-white px-4 sm:px-6">
      {props.meta.total_results > 30  && 
        <div className="flex flex-1 justify-between sm:hidden mb-8">
            <button
                onClick={prev}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Previous
            </button>
            <button
                onClick={next}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Next
            </button>
        </div>
      }      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{1 + (props.currentPage * 30) - 30}</span> to <span className="font-medium">{(props.meta.total_results > 29 ) ? (props.currentPage * 30):props.meta.total_results}</span> of{' '}
            <span className="font-medium">{props.meta.total_results ?? 0}</span> results
          </p>
        </div>
        {props.meta.total_results > 30  && 
        <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            
            <button
                onClick={prev}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pages.map((page, key) => (
                <button
                    key={key}
                    onClick={() => handleChangePage(page)}
                    aria-current="page"
                    className={"relative inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20"
                    + (props.currentPage == page ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0')}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={next}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            </nav>
        </div>
        }
      </div>
    </div>
  );
}