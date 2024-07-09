import React from 'react';
import { CiLocationOn } from "react-icons/ci";  
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Display = ({ id, company, title, type, venue, stipend }) => {
    const navigate = useNavigate();

    function handleClick() {
        console.log('clicked', id);
        navigate(`/${id}`);
    }

    return (
        <div 
            className='
                w-[60%]
                sm:w-[100%] 
                md:h-fit-content
                bg-gray-800 
                mt-4 
                border 
                border-gray-700 
                shadow-lg 
                cursor-pointer 
                p-6 
                hover:bg-gray-700 
                transition 
                duration-300 
                ease-in-out 
                rounded-lg 
                text-white 
                flex 
                flex-col 
                gap-4
            ' 
            onClick={handleClick}
        >
            <h1 className='font-bold text-2xl'>{company}</h1>
            <h2 className='font-medium text-gray-300'>{title}</h2>
            <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-2'>
                    <CiLocationOn className='text-xl' />
                    <span>{venue}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <FaRegMoneyBillAlt className='text-xl' />
                    <span>{stipend}</span>
                </div>
            </div>
        </div>
    );
}

export default Display;
