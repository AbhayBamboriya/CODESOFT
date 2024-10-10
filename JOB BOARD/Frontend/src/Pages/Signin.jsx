import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className='w-full p-10 h-screen bg-gray-900 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 overflow-hidden overscroll-hidden snap-none'>
    <motion.div variants={variants} initial="initial" whileInView="animate" className='w-full lg:w-1/2'>
        <h1 className='text-7xl md:text-5xl text-center text-white font-bold'>Your dreams are just a sign-in away.</h1>
    </motion.div>
    <form className='flex flex-col gap-5 w-full lg:w-1/2 items-center bg-gra-800 p-5 rounded-xl max-sm:w-11/12 max-sm:h-3/4 md:w-full md:max-h-60 md:h-auto lg:max-h-[50%] lg:h-auto' onSubmit={signin}>
        <motion.input variants={variants} initial="initial" whileInView="animate" type="text" name="email" placeholder='Enter your Email' className='bg-transparent border-2 text-xl text-white p-3 w-full border-red-200 rounded-xl' onChange={handleUserInput} value={signinData.email}/>
        <motion.input variants={variants} initial="initial1" whileInView="animate" type="password" name="password" placeholder='Enter password' className='bg-transparent text-xl border-2 text-white p-3 w-full border-red-200 rounded-xl' onChange={handleUserInput} value={signinData.password}/>
        <motion.button type='submit' variants={variants} initial="button" whileInView="animate" className='bg-orange-500 text-white text-xl p-3 rounded-xl w-full'>Login</motion.button> 
        <h2 className='text-white'>Don't Have an Account ? <span className='hover:underline cursor-pointer hover:text-emerald-400'><Link to='/signup'>Sign Up</Link></span></h2>
    </form>
    
</div>

  
  )
}

export default Signin
