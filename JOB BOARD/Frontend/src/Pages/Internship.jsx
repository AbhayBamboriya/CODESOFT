import React, { useEffect, useState } from 'react';
import Display from './Display';
import Search from '../Compnents/Search';
import { FaFilter } from "react-icons/fa6";
import { AllInternship, AllJobs } from '../Redux/Slices/JobInternSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Internship = () => {
    const dispatch = useDispatch();
    const [searchLocation, setSearchLocation] = useState('');
    const [Domain, setDomain] = useState('');
    const navigate=useNavigate()
    const location = useLocation();
    const { internship, job } = useSelector((state) => state.services);
    console.log('internships are',internship);
    useEffect(() => {
        dispatch(AllInternship());
        dispatch(AllJobs());
    }, [dispatch]);

    const filteredInternships = Array.isArray(internship) && internship && internship.filter((i) => {
        if (searchLocation && !i.venue.toLowerCase().includes(searchLocation.toLowerCase())) {
            return false;
        }
        if (Domain && !i.title.toLowerCase().includes(Domain.toLowerCase())) {
            return false;
        }
        return true;
    });

    const filteredJobs = Array.isArray(job) && job.filter((i) => {
        if (searchLocation && !i.venue.toLowerCase().includes(searchLocation.toLowerCase())) {
            return false;
        }
        if (Domain && !i.title.toLowerCase().includes(Domain.toLowerCase())) {
            return false;
        }
        return true;
    });

    return (
        <div className='flex flex-col md:flex-row justify-center items-start min-h-screen h-[100vh] bg-gray-500 text-white'>
        
            <div className='bg-gray-800 w-full md:w-1/4 p-4 md:p-8 flex flex-col items-center gap-4 h-full justify-center'>
                <h1 className='italic text-2xl flex items-center gap-2'><FaFilter className='text-sky-500' />Filters</h1>
                <Search updateSearchTerm={setDomain} placeholder='Enter Domain' id="location" />
                <Search updateSearchTerm={setSearchLocation} placeholder='Enter Location' id="domain" />
                <button className='hover:text-emerald-500' onClick={()=>navigate(-1)}>Go Back</button>

            </div>
            <div className='bg-gray-800  h-screen w-full md:w-3/4 p-4 md:p-8 flex bg-blac flex-col items-center gap-6 overflow-y-scroll'>
                <h1 className='font-bold text-3xl md:text-5xl text-center'>
                    {location.pathname === "/Internship" ? "Internship" : "Job"}
                </h1>
                {location.pathname === "/Internship" ?
                    Array.isArray(filteredInternships) &&  filteredInternships.map((i) => (
                        <Display
                            company={i.company}
                            title={i.title}
                            type={i.type}
                            venue={i.venue}
                            stipend={i.stipend}
                            key={i._id}
                            id={i._id}
                        />
                    ))
                    :
                    Array.isArray(filteredJobs) &&  filteredJobs.map((i) => (
                        <Display
                            company={i.company}
                            title={i.title}
                            type={i.type}
                            venue={i.venue}
                            stipend={i.stipend}
                            key={i._id}
                            id={i._id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Internship;
