import React from 'react'
import { useState } from 'react'
import Datepicker from "tailwind-datepicker-react"
import moment from 'moment';
// import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const InputDatepicker = (props) => {

    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date(),
        minDate: new Date("1950-01-01"),
        theme: {
            todayBtn: "",
            disabledText: "",
            clearBtn: "",
            icons: "",
            text: "",
            input: "",
            inputIcon: "",
            selected: "",
        },
        defaultDate: props.value ? new Date(props.value) : new Date(),
        language: "en",
    }

    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(props.value? moment(props.value).format('MMMM DD,YYYY') : '')
    const [showSelectedDate , setShowSelectedDate ] = useState(true)
    
	const handleChange = (selectedDate) => {
        setSelectedDate(moment(selectedDate).format('MMMM DD,YYYY'))
        props.getValue({
            name: props.id,
            value: moment(selectedDate).format('YYYY-MM-DD'),
        });		
        setShowSelectedDate(true);
	}

    const handleClear = (state) => {
		props.getValue({
            name: props.id,
            value: "",
        });	
        setShowSelectedDate(false);
	}

    const CalendarIcon = () => {
        return (
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                ></path>
            </svg>
        )
    }


    return (
        <div className="relative"> 
            {/* <Datepicker show={show} setShow={(state) => setShow(state)} options={options} classNames="absolute" /> */}
			<Datepicker options={options} onChange={handleChange} show={show} setShow={(state) => setShow(state)} >
                <div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<CalendarIcon />
					</div>
					<input
                        type="text"
                        name={"date"}
                        id="date"
                        className="pl-9 pr-2.5 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select Date"
                        value={selectedDate && showSelectedDate ? selectedDate : ""}
                        onFocus={() => setShow(true)}
                        onChange={handleChange} 
                    />
				</div>
            
            </Datepicker>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                    type="button"
                    className="w-full px-5 py-2 text-sm font-medium text-center text-gray-900 rounded-lg dark:text-white "
                    onClick={handleClear}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            
		</div>
    )
}

export default InputDatepicker