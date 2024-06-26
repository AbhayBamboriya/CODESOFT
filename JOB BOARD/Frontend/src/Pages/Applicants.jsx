import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchDetailOfAllPost, FindingByID } from '../Redux/Slices/JobInternSlice'
import { FaFilePdf } from "react-icons/fa";
const Applicants = () => {
    const id=useSelector((state)=>state?.auth?.id)
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
  return (
    <div className='h-fit     w-full '>
        
        <div className='flex items-center justiy-center bg- h-full w-full flex-col '>
            <h1 className='text-6xl font-bold m-[3%] text-center'>Applicants</h1>
            <div className='w-full bg-yellw-300 flex justify-center -center'>
            <table className="table overflow  w-[80%]  border border-red-200 border-4 rounded-4xl">
                <thead className='text-gray-500 text-2xl bg-red-100 pt-[20px] h-20'>
                    <tr>
                        <th>
                            SNo.
                        </th>
                        
                        <th>
                            Title
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Venue
                        </th>
                        <th>
                            Resume
                        </th>
                        
                    </tr>
                </thead>
                let t=1
                <tbody className='gap-11px'> 
                {
                        data.length > 0 && 
                        data.map((m, idx) => {
                            if (m.apply.length > 0) {
                                return m.apply.map((mt) => (
                                    
                                    <tr key={mt.id} className='text-center text-xl bg-ed-200 p-3 border h-20 border-b-3px '>
                                        {console.log('m.apply is',mt)}
                                        <td>{idx + 1}</td>
                                        <td>{m?.title}</td>
                                        <td>{m?.type}</td>
                                        <td>{m?.venue}</td>
                                        <td className='flex mt-[5%] justify-center text-5xl '><a href={mt.resume.secure_url}><FaFilePdf  className='hover:text-rose-400'/></a></td>
                                    </tr>
                                ));
                            }
                            return null;    
                        })
                }

                </tbody>
            </table>
            
            </div>
        </div>
    </div>
  )
}

export default Applicants
