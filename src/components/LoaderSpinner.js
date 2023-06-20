import React from 'react';
import { InfinitySpin  } from  'react-loader-spinner'

const LoaderSpinner = (props) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <InfinitySpin 
                width='200'
                color="#4fa94d"
            />
            <h2 className="text-center text-white text-xl font-semibold">{props.text}</h2>
            <p className="w-1/3 text-center text-white">{props.subtext ?? "This may take a few seconds, please don't close this page." }</p>
        </div>
        // <div className="flex h-screen">
        //     
        //     <span>{props.text}</span>
        // </div>
    )
  
};

export default LoaderSpinner