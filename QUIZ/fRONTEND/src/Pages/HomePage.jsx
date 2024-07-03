import React from 'react'
import img from '../assets/quiz-2074324__480.webp'
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
       <div  className="flex items-center justify-center backdrop-brightness-90 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            <div className="flex items-center justify-center h-screen w-[80%] gap-[10%]">
                    <div className="text-center"> 
                    <h1 className="text-8xl hover:text-emerald-400 text-white">Put Your Knowledge to the Test: Quiz Ahead!</h1>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <img src={img} alt="" srcset="" />
                      <div className='flex flex-col items-center gap-4'>
                        <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-[30%] pt-[2%] pb-[2%] rounded-3xl'><Link to='/login'>Sign In</Link></button>
                        <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-[30%] pt-[2%] pb-[2%] rounded-3xl'><Link to='/signup'>Sign Up</Link></button>
                      </div>
                    </div>
            </div>
      </div>  
    </div>
  )
}

export default HomePage
