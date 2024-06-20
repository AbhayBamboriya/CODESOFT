import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Display from './Display';
import Search from '../Compnents/Search';
import { FaFilter } from "react-icons/fa6";
import { filteredData } from '../Redux/Slices/JobInternSlice';
const Internship = () => {
    const dispatch=useDispatch()
    const {internship}=useSelector((state)=>state.services)
    console.log('internship/jsx',internship);
    const [searchLocation,setsearchLocation]=useState('')
    const [Domain,setDomain]=useState('')
    useEffect( ()=>{
        console.log('location',searchLocation,Domain);
        // filter()
        // dispatch(filteredData({searchLocation,Domain}))
    },[searchLocation,Domain])
   
  return (

    <div className='flex justify-center items-enter h-[100vh] bg-white'>
        <div className='bg-gray-100 h-[100vh] w-1/4 flex justify-center items-center p-[2%] flex-col gap-2'>
                <h1 className='italic text-2xl flex items-center gap-[2%]'><FaFilter className='text-sky-800'/>Filters</h1>
               <Search updateSearchTerm={setDomain} placeholder='Enter Domain' id="location"/>
               <Search updateSearchTerm={setsearchLocation} placeholder='Enter Location' id="domain"/>
        </div>
        <div className='bg-gray-100 w-[50%] t-[4%] flex justify-cener overflow-y-scroll items-ceter flex-col gap-[20px] h-[100vh]'>
            <h1 className='  font-bold text-5xl text-center bg- ed-400 mt-[0%] w-full '>Internship</h1>
           
            

     
{internship.filter((i)=>{
  
  if(searchLocation){
    return searchLocation.toLowerCase() == '' ? i : i.venue.includes(searchLocation) 
  }

  else if(Domain){
    return Domain.toLowerCase() == '' ? i : i.title.includes(Domain) 
  }


  else if(!searchLocation && !Domain){
    return i
  }

  else{
    return (Domain.toLowerCase() == '' && searchLocation.toLowerCase()=='') ? i : i.title.includes(Domain) && i.venue.includes(searchLocation) 
  }
}).map((i)=>{
                return <Display company={i.company} title={i.title} type={i.type} venue={i.venue} stipend={i.stipend} key={i._id} id={i._id}/>
            })}
        </div>
    </div>
  )
}

export default Internship
