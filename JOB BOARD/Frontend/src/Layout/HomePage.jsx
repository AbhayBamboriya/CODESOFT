import { Link, useLocation } from 'react-router-dom'
import { AllInternship, AllJobs } from '../Redux/Slices/JobInternSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Div from './Div'
import Footer from '../Section/Footer'
import jobimg from '../assets/pexels-george-milton-7034717.jpg'
import jobimg1 from '../assets/pexel1.jpg'
import jobimg2 from '../assets/pexel2.jpg'
import jobimg3 from '../assets/pexels3.jpg'
import Marquee from "react-fast-marquee";
import amazon from '../assets/amazon.jpeg'
import cisco from '../assets/cisco.jpeg'
import ibm from '../assets/ibm.jpeg'
import google from '../assets/google.jpeg'
import gms from '../assets/gms.jpeg'
import microsoft from '../assets/microsoft.jpeg'

import Navbar from '../Pages/Navbar'


const HomePage = () => {
    const dispatch=useDispatch()
    const {internship,job}=useSelector((state)=>state.services)
    // internship.splice(1,6);
    const AllJob=useSelector((state)=>state.services.AllJobs)
    console.log('all job is',AllJob);

    // AllJob.forEach(obj => {
    //     console.log('printing',JSON.stringify(obj, null, 2));
    //   });
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector((state)=>state.auth.role)
    // console.log('role is',role);
    // console.log('intrrrer in home',internship);
    // console.log('job from state',job);
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
       <div className="flex items-center justify-center flex-col" >
            <Navbar/>
            <div className="bg-back w-[90%] h-full">
                
                <h1 className='text-6xl font-sans text-white text-center mt-[5%]'>Find Employment at your Finger Tips</h1>
                <div className='mt-[5%] flex flex-col gap-[160px]'>
                    <div className='flex items-center'>
                        <img src={jobimg1} className='rounded-2xl' height={700} width={700}  alt="" srcset="" />
                        <hr className='flex-grow border-t border-gray-400' style={{ marginLeft: '20px' }} />
                    </div>
                    <div className='flex items-center'>
                    <hr className='flex-grow border-t border-gray-400' style={{ marginRight: '20px' }} />
                        <img src={jobimg2} className='rounded-2xl' height={700} width={700}  alt="" srcset="" />
                        
                    </div>
                    <div className='flex items-center'>
                        <img src={jobimg3} className='rounded-2xl' height={700} width={700}  alt="" srcset="" />
                        <hr className='flex-grow border-t border-gray-400' style={{ marginLeft: '20px' }} />
                    </div>
                </div>
                <div className=' gap-[2%] h-[57%] bg-blak gap-auto mt-[10%]' >
                    
                    <h3 className='text-white text-3xl mt-[5%] font-bold leading-loose tracking-light text-center'>Latest Interships on Job Portal</h3>
                  
                    <Slider {...settings}>
                    {
                        internship &&
                            internship.map((i)=>{
                            return <Div  company={i.company} title={i.title} type={i.type} venue={i.venue} stipend={i.stipend} key={i._id} id={i._id}/>
                        })
                        
                        
                    }
                    </Slider>
                    
                </div>




                <div className=' gap-[2%] h-[57%] bg-blak gap-auto '>
                <h3 className='text-white text-3xl mt-[5%] font-bold leading-loose tracking-light text-center'>Latest Jobs on Job Portal</h3>
                    
                    
                        <Slider {...settings}>
                        {
                            job &&
                                job.map((i)=>{
                                    // console.log('map ',i._id);
                                return <Div  company={i.company} title={i.title} type={i.type} venue={i.venue} stipend={i.stipend} key={i._id} id={i._id}/>
                            })
                            
                            
                        }
                        </Slider>
                    
                </div>
                <div className='App mt-[50px] text-center'>
                    <div className='mb-[50px]'>
                        <h1>
                            Our Recuirters
                        </h1>
                    </div>
                    <div>
                        {/* <Marquee>
                            <div className='flex h-[1%] gap-2 img-wrapper m-8px'>
                                <img src={google} alt="" srcset="" height={10} width={290} className='w-[20%]' />
                                <img src={amazon} alt="" srcset="" width={290} className='w-[20%]' />
                                <img src={cisco} alt="" srcset="" width={290} className='w-[20%]' />
                                <img src={gms} alt="" srcset="" width={290} className='w-[20%]' />
                                <img src={ibm} alt="" srcset="" width={290} className='w-[20%]' />
                                <img src={microsoft} alt="" srcset="" width={190} className='w-[20%] h-[1%]' />
                            </div>
                        </Marquee> */}
                    </div>
                </div>
                <Footer/>
            </div>

            
        
    </div>
    )
}

export default HomePage
