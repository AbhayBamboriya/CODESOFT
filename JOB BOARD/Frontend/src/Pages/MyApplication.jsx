import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FindingByID } from '../Redux/Slices/JobInternSlice'
import { FindByIdApplication } from '../Redux/Slices/auth'
import { useNavigate } from 'react-router-dom'

const MyApplication = () => {
    const application=useSelector((state)=>state?.auth?.data?.apply)
    // const id=useSelector((state)=>state?.auth?.id)
    const navigate=useNavigate()
    console.log('id and application',application)
    const [data, setData] = useState();
    const dispatch =useDispatch()
    async function download(){
        // console.log('reaced here',id);
        const res= await dispatch(FindByIdApplication())
        setData(res?.payload?.user?.apply)
        // console.log('sjdjsjds',res);
        // console.log('res is details data in data'  ,data);
    }
  
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        download()
      },[]);

      console.log('is use state',data);
  return (
    <div className='h-[100vh] w-full bg-wite'>
        
        <div className='flex items-center justiy-center bg- h-full w-full flex-col '>
            <h1 className='text-6xl font-bold m-[3%] text-center'>My Application</h1>
            <div className='w-full bg-yellw-300 flex justify-center -center'>
            <table className="table overflow  w-[80%]  border border-red-200 border-4 rounded-4xl">
                            <thead className='text-gray-500 text-2xl bg-red-100 pt-[20px] h-20'>
                                <tr>
                                    <th>
                                        SNo.
                                    </th>
                                    <th>
                                        Company
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
                                        Deadline
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody className='gap-11px'> 
                                {
                                    Array.isArray(data)  && data.length>0 && 
                                    data.map((m,idx)=>{
                                        return(
                                            <tr className='text-center text-xl bg-ed-200 p-3 border h-20 border-b-3px'>
                                                <td>{idx+1}</td>
                                                <td>{m?.company}</td>
                                                <td>{m?.title}
                                                   
                                                </td>
                                                <td>{m?.type}</td>
                                                <td>{m?.venue}</td>
                                                <td>{m?.deadline}</td>
                                            </tr>
                                            
                                        //  /   <p>Abhay</p>
                                        )
                                    })
                                }
                            </tbody>
                    </table>
            </div>
            <button 
                className='sm:w-1/6  md:w-1/4 lg:w-1/6 px-4 bg-cyan-600 hover:bg-yellow-500 rounded-xl transition-all ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer mt-[2%]' onClick={()=>navigate(-1)}>
                Go Back
            </button>
        </div>
    </div>
  )
}

export default MyApplication
