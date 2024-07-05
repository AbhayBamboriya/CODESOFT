import React from 'react'
import img from '../assets/quiz-2074324__480.webp'
const Navbar = () => {
  return (
        <>
            <div className='bg-[#0c0c1d] w-full h-full p-[3%] flex  justify-around'>
                <div className='h-[10%] w-[10%]'>
                    <img src={img} className='w-[60%]'/>
                </div>
                <div className='flex'>
                    <ul className='flex gap-[30%] text-white'>
                        <li className='cursor-pointer'>
                            Logout
                        </li>
                        <li className='cursor-pointer'>
                            Contact
                        </li>
                        <li className='cursor-pointer'>
                            Quiz
                        </li>
                        <li className='cursor-pointer'>
                            Profile
                        </li>
                    </ul>

                </div>
            </div>
        </>
  )
}

export default Navbar
