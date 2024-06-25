import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import { login } from '../Redux/Slices/auth';
// import { signin } from '../Redux/Slices/auth';
function Signin() {

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [signinData,setSigninData]=useState({
        email:"",
        password:"",
        // role:""
    })

    function handleUserInput(e){
        const {name,value}=e.target;
        setSigninData({
            ...signinData,
            [name]:value
        })
    }

    

    async function signin(e){
        console.log('insifnin',signinData   );
        e.preventDefault();
        if(!signinData.email || !signinData.password){
            console.log('inser');
            console.log(toast.error('Please fill all the details'))
            return
        }

        console.log('abhay');
        if(!isEmail(signinData.email)){
            toast.error('Invalid Email Id')
            return
        }
        const response=await dispatch(login(signinData))
 
        console.log('respone- '+JSON.stringify(response));
        if(response?.payload?.success) navigate('/')
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
            // y:50,
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
                duration:1,
                staggerChildren:0.1
            }
        }
    }
  return (  
        <div className='w-[100%] p-[10%] h-[100vh] bg-back flex lg:flex-row max-md:flex-col  items-center justify-center gap-[20%] max-sm:bg-re-300 max-sm:flex-col max-lg:flex-col no-doc-scroll overscroll-hidden snap-none'>
            <motion.div variants={variants} initial="initial" whileInView="animate" className='md:w-[100%]'>
                <h1 className='text-8xl flex text-center text-white lg:font-bold md:font-xl max-sm:text-7xl max-md:text-6xl min-lg:leading-2  max-xl:font-light '>Your dreams are just a sign-in <br/>away.</h1>
            </motion.div>
            <form className='flex flex-col gap-5 lg:h-[50%] w-[30%]  md:h-[100%] bg-blak md:w-[100%] items-center max-sm:w-[90%] max-sm:h-[75%] max-md:w-[100%] max-md:h-[60%] max-sm:gap-8'  onSubmit={signin}>
                    <motion.input variants={variants} initial="initial" whileInView="animate" type="text" name="email" placeholder='Enter your Email' className='bg-transparent border-2 text-xl  text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.email}/>
                    <motion.input variants={variants} initial="initial1" whileInView="animate" type="password" name="password" id="" placeholder='Enter password' className='bg-transparent text-xl  border-2 text-white  w-[100%] lg:w-[90%] md:w-[70%] p-5 border-red-200 rounded-xl md:h-[10%] lg:h-[30%]  max-sm:h-[20%]' onChange={handleUserInput} value={signinData.password}/>
                    {/* <label for="options" class="block text-sm font-medium text-gray-700">Select an option</label> */}
        {/* <select id="options" class="mt-1 block w-full border text-3 bg-transparent w-[100%] lg:w-[90%] md:w-[70%] md:h-[10%] lg:h-[30%]  max-sm:h-[20%] border-gray-300 bg-white p-5 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signinData.role} onChange={handleUserInput}>
            <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Role</option>
            <option value="admin" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Admin</option>
            <option value="employee" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Employee</option>
        </select> */}
                    
                    <motion.button type='submit' variants={variants} initial="button" whileInView="animate" className='bg-orange-500 lg:h-[30%] h-[10%] lg:w-[90%] max-md:h-[70%] w-[100%] rounded-xl md:w-[70%] max-sm:h-[20%]' >Submit</motion.button> 
            </form>
        </div> 
  
  )
}

export default Signin
