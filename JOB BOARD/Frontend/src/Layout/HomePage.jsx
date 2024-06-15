import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { AllInternship, AllJobs } from '../Redux/Slices/JobInternSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Div from './Div'
import Footer from '../Section/Footer'
import Dropdown from './Dropdown'

const HomePage = () => {
    const dispatch=useDispatch()
    const {internship,job}=useSelector((state)=>state.services)
    // console.log('intrrrer in home',internship);

    useEffect(()=>{
        dispatch(AllInternship())
        dispatch(AllJobs())
    },[])
    const settings={
        dots:true,
        speed:500,
        slidesToShow:3,
        slidesToScroll:3,
        // width:50
        infinite:false
    }
    return(
       <div className="flex items-center justify-center flex-col">

            <div className="bg-back w-[90%] h-[100vh]">
                <nav className='mt-[5%] ml-[5%] text-white flex gap-10 justify-around'>
                    <img src={logo} alt="" srcset="" className='w-[3%] h-full cursor-pointer'/>
                    <ul className='margin-auto flex gap-10'>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'><Link to="/signin">Sign In</Link></li>
                        <li className='cursor-pointer'><Link to='/signup'>Sign Up</Link></li>
                        <li className='cursor-pointer'>Contact</li>
                    </ul>
                </nav>

                <div className='flex flex-col items-center justify-center mt-[5%]'>
                        <Dropdown/>
                        <input type="text" className='text-center  py-3 w-[50%] ' />
                        <h1 className='text-white text-5xl mt-[5%] font-bold leading-loose tracking-light text-center'>Make your dream carrier a reality</h1>
                        <h3 className='text-white text-3xl mt-[5%] font-bold leading-loose tracking-light text-center'>Latest Internships on Job Portal</h3>
                </div>

                
                <div className=' gap-[2%] h-[57%] bg-blak gap-auto '>
                    
                    
                    <Slider {...settings}>
                    {
                        internship &&
                        
                            internship.map((i)=>{
                            return <Div  company={i.company} title={i.title} type={i.type} venue={i.venue} stipend={i.stipend} key={i._id}/>
                        })
                        
                        
                    }
                    </Slider>
                    
                </div>




                <h3 className='text-white text-3xl mt-[5%] font-bold leading-loose tracking-light text-center'>Latest Jobs on Job Portal</h3>
                <div className=' gap-[2%] h-[57%] bg-blak gap-auto '>
                    
                    
                    <Slider {...settings}>
                    {
                        job &&
                        
                            job.map((i)=>{
                            return <Div  company={i.company} title={i.title} type={i.type} venue={i.venue} stipend={i.stipend} key={i._id}/>
                        })
                        
                        
                    }
                    </Slider>
                    
                </div>
                <Footer/>
            </div>

            
        
    </div>
    )
}

export default HomePage
