import React, { useState } from 'react'
import { RiFileUploadFill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";    
import { useParams } from 'react-router-dom';
const Apply = () => {
    const [pdf,setPdf]=useState()
    const {Companyid}=useParams()
    // console.log('id is ',id);
    async function upload(){
      
            try{
                const res=jobInstance.post(`/${Companyid}`)
                return (await res).data
            }
            catch(e){
                toast.error(e?.response?.data?.message)
            }
        
    }
    function settingPDF(e){
        e.preventDefault()
        console.log('in function',e.target.files[0]);
        setPdf({
            ...pdf,
            file:e.target.files[0]
        })

        console.log('in pdf',pdf);
    }
    // useEffect(()=>{
    //     upload()
    // },[pdf])
  return (
    <div className='flex items-center h-[100vh] bg-gray-300 justify-center'>
        <form onSubmit={upload}>
            <label htmlFor="image_uploads">
                          {pdf ? (
                                <FaFilePdf value={pdf}  className='w-24 h-24 rounded-full m-auto '/>
                            ):  
                                (<RiFileUploadFill className='w-24 
                                cursor-pointer
                                h-24 rounded-full m-ato'/>)}
                            
                        </label>
                        <input 
                                className="hidden"
                                type="file" 
                                onChange=
                                {settingPDF}
                                // value={pdf}
                                // name through which it will go to server
                                name="image_uploads"
                                id="image_uploads"
                                accept=".pdf"
                        />
                        <button type='submit' className='bg-orange-500 lg:h-[35%] h-full lg:w-[90%] max-md:h-[70%] w-[100%] rounded-xl md:w-[70%] max-sm:h-[20%] max-lg:h-[10%]' >Submit</button> 
        </form>
    </div>
  )
}

export default Apply
