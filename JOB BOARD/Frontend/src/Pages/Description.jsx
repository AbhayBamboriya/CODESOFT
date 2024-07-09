import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FindingByID } from '../Redux/Slices/JobInternSlice'
import { RiFileUploadFill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";   
import { CiLocationOn } from "react-icons/ci";  
import { FaRegMoneyBillAlt ,FaRupeeSign} from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import toast from 'react-hot-toast';
import jobInstance from '../Helpers/jobInstance';
import Navbar from './Navbar';

const Description = () => {
  const {id}=useParams()
  const dispatch=useDispatch()
  const [data,setData]=useState({})
  const[show,SetShow]=useState(false)
  const navigate=useNavigate()
  async function download(){
    console.log('id',id);
    await dispatch(FindingByID(id))
  }

  
    const [pdf,setPdf]=useState()
    const {Companyid}=useParams()
    function toggle(){
      SetShow(prev=>!prev)
      // console.log('state change',s);
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


  useEffect(()=>{
    download()

  },[])
  const [loading,setLoading]=useState(false)
  const job=useSelector((state)=>state.services)
  const skill=useSelector((state)=>state.services.detail?.skills)
  const perks=useSelector((state)=>state.services.detail?.perks)
  const userId=useSelector((state)=>state.auth.data?._id)
  // console.log('skills is',skill,perks);

  // const Companyid=useParams()
  async function upload(e){
    setLoading(true)
      e.preventDefault()
    try{
      if(!userId){
        toast.error('To Apply Please Login')
        navigate('/signin')
        return
      }
      if(!pdf){
        toast.error('Resume is required')
        return
      }
      
    
      console.log('in uploads funtion');
        const type=job?.detail?.title
        
        console.log('typeeeee',type," useer id is",userId,"companu id is ",id,"pdf is",pdf);

        const res=await jobInstance.post(`/${id}`,{"resume":pdf.file,type:type,userId:userId},{

          headers: {
              'Content-Type': 'multipart/form-data',
          }})
        
        // toast.promise(res,{
        //     loading:"Wait! Authentication in Progress ",
        //     success:(data)=>{
        //         return 'done'
        //     },
        //     error:"Failed to Login"
        // });
        
        console.log('res getting',res);
        setLoading(false)
        if(res?.data?.success) { 
          toast.success(`You have successfully applied to ${job?.detail?.type}`)
          navigate('/')
          setPdf('')
        }
        // return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }

}

  return (
    <div className='flex flex-col items-center justify-center h-max'>
    <Navbar />
    <div className='w-full md:w-[90%] shadow-lg rounded-xl mt-5 md:mt-10 p-4 md:p-8 h-fit'>
        <div className='w-full max-h-fit bg-black bg-opacity-70 text-white flex flex-col gap-10 p-4 md:p-8'>
            <h1 className='font-black text-4xl md:text-5xl leading-tight tracking-tighter text-center italic'>
                Applying For {job?.detail?.title} {job?.detail?.type}
            </h1>
            <h1 className='text-gray-400 font-bold text-xl text-center'>{job?.detail?.company}</h1>
            <p className='flex items-center justify-center text-xl gap-2'>
                <CiLocationOn /> {job?.detail?.venue}
            </p>

            <div className='flex flex-col md:flex-row justify-around gap-4 items-center'>
    <div className='flex flex-col items-center gap-2'>
        <h2 className='flex items-center gap-3 text-xl text-white'>
            <FaRegMoneyBillAlt className='text-2xl' />
            <span className='text-gray-500 font-semibold'>EXPERIENCE</span>
        </h2>
        <p className='text-xl'>{job?.detail?.experience}</p>
    </div>
    <div className='flex flex-col items-center gap-2'>
        <h2 className='flex items-center gap-3 text-xl text-white'>
                <FaRegMoneyBillAlt className='text-2xl font-bold' />
                <span className='text-gray-500 font-semibold'>
                    {job?.detail?.type === 'Internship' ? 'STIPEND' : 'SALARY'}
                </span>
            </h2>
            <p className='flex items-center gap-2 text-xl'>
                <FaRupeeSign /> {job?.detail?.stipend}
            </p>
        </div>
        <div className='flex flex-col items-center gap-2'>
            <h2 className='flex items-center gap-3 text-xl text-white'>
                <MdOutlineDateRange className='text-2xl' />
                <span className='text-gray-500 font-semibold'>DEADLINE</span>
            </h2>
            <p className='text-xl'>{job?.detail?.deadline}</p>
        </div>
    </div>


            <div>
                <h2 className='text-xl'>Description</h2>
                <p className='text-xl'>{job?.detail?.description}</p>
            </div>

            <div className='flex flex-col gap-4'>
                <span className='font-bold text-xl'>Skill Required</span>
                <div className='flex gap-3'>
                    {skill?.map((s, index) => (
                        <h6
                            key={index}
                            className='text-black text-xl bg-gray-100 pl-2 pr-2 pt-1 pb-1 rounded-xl'
                        >
                            {s}
                        </h6>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <span className='font-bold text-xl'>Perks</span>
                <div className='flex gap-3'>
                    {perks?.map((s, index) => (
                        <h6
                            key={index}
                            className='text-black bg-gray-100 pl-2 pr-2 pt-1 pb-1 text-xl rounded-xl'
                        >
                            {s}
                        </h6>
                    ))}
                </div>
            </div>

            <div className='w-full h-16 flex justify-center'>
                <button className={show ? 'hidden' : 'bg-sky-500 text-center hover:bg-sky-600 text-white w-full md:w-1/5 text-xl h-full'}
                    onClick={toggle}
                >
                    Apply Now
                </button>

                <form className={show ? '' : 'hidden'}>
                    <label htmlFor='image_uploads'>
                        {pdf ? (
                            <FaFilePdf className='w-24 h-24 rounded-full m-auto' />
                        ) : (
                            <RiFileUploadFill className='w-24 h-24 rounded-full m-auto cursor-pointer'  />
                        )}
                    </label>
                    <input
                        className='hidden'
                        type='file'
                        onChange={settingPDF}
                        name='image_uploads'
                        id='image_uploads'
                        accept='.pdf'
                    />
                    <button
                        onClick={upload}
                        className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'
                    >
                        {loading ? 'Applying ....' : 'Apply'}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Description
