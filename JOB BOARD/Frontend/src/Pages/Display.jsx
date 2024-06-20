import React from 'react'
import { CiLocationOn } from "react-icons/ci";  
import { FaRegMoneyBillAlt ,FaRupeeSign} from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const Display = ({id,company,title,type,venue,stipend}) => {
    const navigate=useNavigate()
    function Click(){
        console.log('clicked',id);
        navigate(`/${id}`);
    }
    // console.log('detail in display',{id,company,title,type,venue,stipend});
  return (
        <div className='h-[50%] bg-back mt-[2%] border-2 shadow-xl cursor-pointer p-[3%] hover:bg-gray-200 ' onClick={Click}>
        <h1 className='font-bold text-xl'>{company}</h1>
        <h2 className='font-normal text-gray-600'>{title}</h2>
        <div className='flex gap-[3%] bg-blac '>
            <h4 className='flex items-center gap-[2%] bg-blak w-1/6'>
                <CiLocationOn/>{venue}
            </h4>
            <h4 className='flex items-center gap-[5%] bg-lack w-1/6'>
                <FaRegMoneyBillAlt/>{stipend} 
            </h4> 
        </div>
        
        </div>
  )
}

export default Display
