import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import { login } from '../Redux/Slices/auth';
// import { signin } from '../Redux/Slices/auth';
function Signin() {

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [signinData,setSigninData]=useState({
        email:"",
        password:"",
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
        if(!signinData.email ||  !signinData.password){
            console.log('inser');
            toast.error('Please fill all the details');
            return
        }

        console.log('abhay');
        if(!isEmail(signinData.email)){
            toast.error('Invalid Email Id')
            return
        }

        
        const formData=new FormData();
        formData.append("email",signinData.email)
        formData.append("password",signinData.password)
        console.log('csk');
        // dispatch creae account action
        const response=await dispatch(login(formData))
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
                <h1 className='text-8xl flex text-center text-white lg:font-bold md:font-xl max-sm:text-7xl max-md:text-6xl min-lg:leading-2  max-xl:font-light'>Your dreams are just a sign-in <br/>away.</h1>
            </motion.div>
            <form className='flex flex-col gap-5 lg:h-[50%] w-[30%]  md:h-[100%] bg-blak md:w-[100%] items-center max-sm:w-[90%] max-sm:h-[75%] max-md:w-[100%] max-md:h-[60%] max-sm:gap-8'  onSubmit={signin}>
                    <motion.input variants={variants} initial="initial" whileInView="animate" type="text" name="email" placeholder='Enter your Email' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.email}/>
                    <motion.input variants={variants} initial="initial1" whileInView="animate" type="password" name="password" id="" placeholder='Enter password' className='bg-transparent border-2 text-white lg:h-[30%] w-[100%] lg:w-[90%] p-5 border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.password}/>
                    
                    <motion.button type='submit' variants={variants} initial="button" whileInView="animate" className='bg-orange-500 lg:h-[25%] h-[10%] lg:w-[90%] max-md:h-[70%] w-[100%] rounded-xl md:w-[70%] max-sm:h-[20%]' >Submit</motion.button> 
            </form>
        </div> 
  
  )
}

export default Signin
