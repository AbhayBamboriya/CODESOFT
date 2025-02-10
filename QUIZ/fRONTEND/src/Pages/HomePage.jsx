import React from 'react'
import img from '../assets/quiz-2074324__480.webp'
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
   <div className="flex items-center justify-center backdrop-brightness-90 fixed top-0 min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] overflow-y-scroll">
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full md:w-[80%] gap-4 md:gap-[10%] px-4">
        <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-7xl lg:text-8xl hover:text-emerald-400 text-white hidden sm:block">
                Put Your Knowledge to the Test: Quiz Ahead!
            </h1>
        </div>
        <div className="flex flex-col items-center gap-3 w-full">
            <img src={img} alt="Quiz Image" className="w-full max-w-xs md:max-w-md lg:max-w-lg" />
            <div className="flex flex-col items-center gap-4 lg:w-full md:w-full sm:p-4 max-md:text-sm sm:w-[20%]">
                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full md:w-[30%] py-2 rounded-3xl">
                    <Link to="/login">Sign In</Link>
                </button>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full md:w-[30%] py-2 rounded-3xl">
                    <Link to="/signup">Sign Up</Link>

                </button>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full md:w-[30%] py-2 rounded-3xl">
                    <Link to="http://localhost:3483/">Go Back</Link>

                </button>

            </div>
        </div>
    </div>
</div>


  )
}

export default HomePage
