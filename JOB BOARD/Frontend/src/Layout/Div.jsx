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
    <div className='bg-blak text-white w-[90%]  hover:w-full bg-[#0c0c2a] hover:bg-[#0A0A25] transition-all ease-in-out duration-500 gap-2px flex  rounded-2xl flex-col mt-[4%]'>
      <div className='flex flex-col gap-[6%] bg-blck h-full m-[10%] justify-items-end'>
        <div className=''>
            <h1 className='font-bold text-2xl' >{title}</h1>
            <h2 className='text-xl'>{company}</h2>
        </div>
        <hr className='w-full mt-[2%] mb-[4%]'/>
        <div className=' h-fit flex flex-col gap-[14px] bg-blck'>
            <h2 className='flex gap-[2%] items-center'><CiLocationOn/>{venue}</h2>
            <h3 className='flex items-center gap-[5%]'><FaRegMoneyBillAlt />
                <div className='flex items-center'>
                    <FaRupeeSign/>{stipend}
                </div>
            </h3>
        </div>
        <div className='my-0 bg-red-30 mt-[40%] ml-[2%] flex justify-between'>
            <span className='bg-gray-900 pl-[2%] pr-[2%] pt-[1%] pb-[1%]'>{type}</span>
            <button className='flex gap-[10px] items-center'><Link to={`/${id}`} className='flex gap-[10px] items-center' >View Detail <FaArrowRight /></Link></button>
        </div>
      </div>
    </div>
  )
}

export default Div
