import React from 'react'
import img from '../assets/quiz-2074324__480.webp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logout } from '../../Redux/Slices/AuthSlice'
// import { toast } from 'react-toastify'
import { toast, ToastContainer } from 'react-toastify';
const Navbar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    async function logout(){
        const res=await dispatch(Logout())
        console.log('res kkin nav',res);

        if(res?.payload?.success)   {
            
            console.log('checkckksdks');
            toast.success("User Logged Out Successfully");
            // toast.success(res?.payload?.message)
            navigate('/')
        }
    }
  return (
        <>
        <ToastContainer/>
            <div className='bg-[#0c0c1d] w-screen h-full p-[3%] flex  justify-around'>
                
                <div className='h-[10%] w-[10%]'>
                    <img src={img} className='w-[60%]'/>
                </div>
                <div className='flex w-'>
                    <ul className='flex gap-[25%] text-white'>
                        <li className='cursor-pointer hover:text-emerald-500' onClick={logout}>
                            Logout
                        </li>
                        <li className='cursor-pointer hover:text-emerald-500' onClick={()=>navigate('/myQuiz')}>
                            My_Quiz
                        </li>
                        <li className='cursor-pointer flex w-fit-content bgblack hover:text-emerald-500'>
                            
                            <Link to='/createQuiz'>Post_Quiz</Link>
                        </li>
                       
                    </ul>

                </div>
            </div>
        </>
  )
}

export default Navbar
