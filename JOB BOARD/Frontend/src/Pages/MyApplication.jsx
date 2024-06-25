import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FindingByID } from '../Redux/Slices/JobInternSlice'

const MyApplication = () => {
    const application=useSelector((state)=>state?.auth?.data?.apply)
    console.log('id and application',application)
    const dispatch =useDispatch()
    async function download(id){
        console.log('reaced here',id);
        return await dispatch(FindingByID(id))
    }
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const results = await Promise.all(application.map(a => download(a.id)));
            setData(results);
          } catch (error) {
            console.error("Error fetching data", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [application]);

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
                                        Duration
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody className='gap-11px'> 
                                {
                                    data.length>0 && 
                                    data.map((m,idx)=>{
                                        return(
                                            <tr className='text-center text-xl bg-ed-200 p-3 border h-20 border-b-3px'>
                                                <td>{idx+1}</td>
                                                <td>{m?.payload?.job?.company}</td>
                                                <td>{m?.payload?.job?.title}
                                                   
                                                </td>
                                                <td>{m?.payload?.job?.type}</td>
                                                <td>{m?.payload?.job?.venue}</td>
                                                <td>{m?.payload?.job?.deadline  }</td>
                                            </tr>
                                            
                                        //  /   <p>Abhay</p>
                                        )
                                    })
                                }
                            </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}

export default MyApplication
