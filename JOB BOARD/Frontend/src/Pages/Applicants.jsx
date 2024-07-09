import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchDetailOfAllPost, FindingByID } from '../Redux/Slices/JobInternSlice'
import { FaFilePdf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Applicants = () => {
    // const id=useSelector((state)=>state?.auth?.id)
    const id=localStorage.id
    const navigate=useNavigate()
    console.log('localstordage',localStorage);
    const dispatch =useDispatch()
    async function download(id){
        const res= await dispatch(FetchDetailOfAllPost(id))
        setData(res.payload.AllPost)
    }
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        download(id)
      }, [id]);

    //   console.log('is use state',data);

      console.log('state daataa',data);
      let t=1
  return (
    <div className='min-h-screen bg-ray-100'>
    <div className='container mx-auto py-8'>
        <h1 className='text-4xl md:text-6xl font-bold text-center text-white mb-8'>Applicants</h1>
        <div className='w-full overflow-x-auto'>
            <table className="min-w-full bg-white bg-opacity-20 border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <thead className='bg-gray-100'>
                    <tr>
                        
                        <th className="px-6 py-3 text-left text-xs md:text-sm uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs md:text-sm uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs md:text-sm uppercase tracking-wider">
                            Venue
                        </th>
                        <th className="px-6 py-3 text-left text-xs md:text-sm uppercase tracking-wider">
                            Resume
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {data.length > 0 &&
                        data.map((m, idx) => {
                            if (m.apply.length > 0) {
                                return m.apply.map((mt,i) => (
                                    <tr key={mt.id} className='bg-white bg-opacity-60'>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                                            {m?.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                                            {m?.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                                            {m?.venue}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500'>
                                            <a href={mt.resume.secure_url} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:text-blue-800'>
                                                <FaFilePdf className='inline-block w-5 h-5 md:w-6 md:h-6' />
                                            </a>
                                        </td>
                                    </tr>
                                ));
                            }
                            return null;
                        })}
                </tbody>
            </table>
            <div className='text-center mt-[5%]'>
            <button 
                className='
                    sm:w-1/6  md:w-1/4 lg:w-1/6 px-4
                    bg-cyan-600 hover:bg-yellow-500 
                    rounded-xl transition-all ease-in-out duration-300 
                    py-2 font-semibold text-lg cursor-pointer
                ' 
                onClick={()=>navigate(-1)}
                >
                Go Back
            </button>
            </div>
        </div>
    </div>
</div>


  )
}

export default Applicants
