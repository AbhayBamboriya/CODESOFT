import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import { createAccount, login } from '../Redux/Slices/auth';
import { BsPersonCircle } from "react-icons/bs"
// import { signin } from '../Redux/Slices/auth';
function Signup() {

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState('')
    const [signupData,setSignupData]=useState({
        email:"",
        password:"",
        ConfirmPassword:"",
        fullName:"",
        profile:"",
        role:""

    })

    function getImage(e){
        event.preventDefault();
        // getting the image on login
        const uploadedImage=e.target.files[0]

        if(uploadedImage){
            setSignupData({
                ...signupData,
                profile:uploadedImage
            })
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                // console.log(this.result);
                setPreviewImage(this.result)
            })

        }
    }


    function handleUserInput(e){
        const {name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    async function signin(e){
        console.log('insifnin',signupData   );
        e.preventDefault();
        if(!signupData.email ||  !signupData.password || !signupData.ConfirmPassword || !signupData.fullName){
            console.log('inser');
            toast.error('Please fill all the details');
            return
        }

        console.log('abhay');
        if(!isEmail(signupData.email)){
            toast.error('Invalid Email Id')
            return
        }

        
        const formData=new FormData();
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        console.log('csk priiiiiiiiiiiiiiii',signupData);
        // dispatch creae account action
        const response=await dispatch(createAccount(signupData))
        // going o home page
        console.log('respone- '+JSON.stringify(response));
        // if(response?.payload?.success) navigate('/')
        // clearing all the entry
        // setPreviewImage('')
        // setSignupData({
        //     fullName:"",
        //     email:"",
        //     password:"",
        //     avatar:""
        // })



    }

    const variants={
        initial:{
            opacity:0,
            y:50,
            x:-200
        },
        initial1:{
            opacity:0,
            // y:50,
            x:200
        },
        button:{
            opacity:0,
            y:-100
        },

        animate:{
            opacity:1,
            x:0,
            y:0,
            transition:{
                delay:4,
                duration:1,
                staggerChildren:0.1
            }
        },
        animateWitnDelay:{
            opacity:1,
            x:0,
            y:0,
            transition:{
                duration:1,
                staggerChildren:0.1
            }
        },
        initialSVG:{
            y:-1,
            x:1
        }
    }
  return (  
        <div className='w-[100%] p-[10%] h-[100vh] bg-back flex 10%] lg:flex-row max-md:flex-col  items-center justify-center gap-[20%] max-sm:bg-re-300 max-sm:flex-col max-lg:gap-[30%] max-lg:flex-col no-doc-scroll overscroll-scroll snap-none bg-blck sm:animation-none'>
            <motion.div variants={variants} initial="initial" whileInView="animateWitnDelay" className='md:w-[100%]'>
                <h1 className='text-7xl flex text-center text-white lg:font-bold md:font-xl max-sm:text-4xl max-md:text-6xl min-lg:leading-2  max-xl:font-light'>Don't miss out! Become a member now.</h1>
            </motion.div>

            
            <div className='w-full h-full items-center justify-center relative bg-ed-300 max-sm:flex-col '>
            <motion.div initial={{opacity:1,y:-170}}  whileInView={{opacity:0}} transition={{duration:4}} className='h-[50%] w-[80%] text-center relative mt-[40%] m-auto bg-blck text-8xl max-sm:hidde max-sm:mt-0 max-lg:pt-[20%]'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <motion.path d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:3}}></motion.path> <motion.path initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:3}} d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></motion.path> </g></svg>
            </motion.div>

            {/* <div className='w-[80%] h-[100%] bg-blak md:h-[50%]'> */}
                <motion.form initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:3,duration:1}} className='flex flex-col gap-5 relative lg:h-[50%] w-[30%] mt-[-80%] md:h-[100%] bg-back md:w-[100%] items-center max-sm:w-[90%] max-sm:h-[75%] max-md:w-[100%] max-md:h-[60%] max-sm:gap-8 max-sm:ml-[20px]'  onSubmit={signin}>
                <label htmlFor="image_uploads" className="cursor-pointer">
                            {previewImage ? (
                                <img className="w-24 h-24 rounded-full m-uto" src={previewImage}/>
                            ) : (
                                <BsPersonCircle className='w-24 h-24 rounded-full m-ato'/>
                            )}
                        </label>
                        <input 
                                className="hidden" 
                                type="file" 
                                onChange={getImage}
                                // name through which it will go to server
                                name="image_uploads"
                                id="image_uploads"
                                accept=".jpg,.jpeg,.png,.svg "
                        />
                        <motion.input variants={variants} initial="initial" whileInView="animate" type="text" name="fullName" placeholder='Enter your Name' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signupData.fullName}/>
                        <motion.input variants={variants} initial="initial1" whileInView="animate" type="text" name="email" placeholder='Enter your Email' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signupData.email}/>
                        <motion.input variants={variants} initial="initial" whileInView="animate" type="password" name="password" id="" placeholder='Enter password' className='bg-transparent border-2 text-white lg:h-[30%] w-[100%] lg:w-[90%] p-5 border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signupData.password}/>
                        <motion.input variants={variants} initial="initial1" whileInView="animate" type="password" name="ConfirmPassword" placeholder='Enter your Confirm Password' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signupData.ConfirmPassword}/>
                        <select id="options" class="bg-transparent mt-1 block w-full border text-3  w-[100%] lg:w-[90%] md:w-[70%] md:h-[10%] lg:h-[30%]  max-sm:h-[20%] border-gray-300 bg-white p-5 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signupData.role} onChange={handleUserInput}>
            <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Role</option>
            <option value="Admin" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Admin</option>
            <option value="Employee" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Employee</option>
        </select>
                        <motion.button type='submit' variants={variants} initial="button" whileInView="animate" className='bg-orange-500 lg:h-[35%] h-full lg:w-[90%] max-md:h-[70%] w-[100%] rounded-xl md:w-[70%] max-sm:h-[20%] max-lg:h-[10%] p-4' >Submit</motion.button> 
                </motion.form>
            </div>
            </div>
        // </div> 
  
  )
}

export default Signup
