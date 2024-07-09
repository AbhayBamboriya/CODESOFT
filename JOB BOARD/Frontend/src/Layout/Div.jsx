import React from 'react'
import { FaRegMoneyBillAlt,FaRupeeSign,FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";  
import { Link } from 'react-router-dom';
function Div({id,company,title,type,venue,stipend}){
    const ID=id
    // function details(){
    //     console.log('id is',ID);
    // }
    // console.log('reached in div',id);
    
    
  return (
    <div className='bg-blak   text-white w-full md:w-[90%] hover:w-full bg-[#0c0c2a] hover:bg-[#0A0A25] transition-all ease-in-out duration-500 gap-2px flex rounded-2xl flex-col mt-4 md:mt-[4%]'>
    <div className='flex flex-col gap-6 bg-blck h-  [30%] mx-10 my-10 md:m-[10%] justify-items-end'>
        <div>
            <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl'>{title}</h1>
            <h2 className='text-xl md:text-2xl'>{company}</h2>
        </div>
        <hr className='w-full mt-2 mb-4'/>
        <div className='flex flex-col gap-4 md:gap-8 sm:text-xs max-sm:text-xs max-sm:gap-5'>
            <h2 className='flex items-center text-sm md:text-base gap-2'><CiLocationOn />{venue}</h2>
            <h3 className='flex items-center text-sm md:text-base gap-5'><FaRegMoneyBillAlt />
                <div className='flex items-center'><FaRupeeSign/>{stipend}</div>
            </h3>
        </div>
        <div className='my-0 bg-red-30 mt-40% md:mt-[40%] ml-2 flex justify-between sm:flex-col sm:gap-5 max-sm:flex-col max-sm:gap-5'>
            <span className='bg-gray-900 pl-2 pr-2 pt-1 pb-1 text-xs md:text-sm text-center'>{type}</span>
            <button className='flex gap-3 items-center text-sm md:text-base'>
                <Link to={`/${id}`} className='flex gap-2 items-center'>View Detail <FaArrowRight /></Link>
            </button>
        </div>
    </div>
</div>
  )
}

export default Div
