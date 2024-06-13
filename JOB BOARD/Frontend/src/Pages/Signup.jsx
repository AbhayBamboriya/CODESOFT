import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import { login } from '../Redux/Slices/auth';
import { BsPersonCircle } from "react-icons/bs"
// import { signin } from '../Redux/Slices/auth';
function Signup() {

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState('')
    const [signinData,setSigninData]=useState({
        email:"",
        password:"",
    })

    function getImage(e){
        event.preventDefault();
        // getting the image on login
        const uploadedImage=e.target.files[0]

        if(uploadedImage){
            setSigninData({
                ...signinData,
                avatar:uploadedImage
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
        <div className='w-[100%] p-[10%] h-[100vh] bg-back flex 10%] lg:flex-row max-md:flex-col  items-center justify-center gap-[20%] max-sm:bg-re-300 max-sm:flex-col max-lg:gap-[30%] max-lg:flex-col no-doc-scroll overscroll-scroll snap-none'>
            <motion.div variants={variants} initial="initial" whileInView="animate" className='md:w-[100%]'>
                <h1 className='text-8xl flex text-center text-white lg:font-bold md:font-xl max-sm:text-7xl max-md:text-6xl min-lg:leading-2  max-xl:font-light'>Your dreams are just a sign-in <br/>away.</h1>
            </motion.div>
            {/* <div className='w-[80%] h-[100%] bg-blak md:h-[50%]'> */}
                <form className='flex flex-col gap-5 lg:h-[50%] w-[30%] mt-[-20%] md:h-[100%] bg-back md:w-[100%] items-center max-sm:w-[90%] max-sm:h-[75%] max-md:w-[100%] max-md:h-[60%] max-sm:gap-8'  onSubmit={signin}>
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
                        <motion.input variants={variants} initial="initial" whileInView="animate" type="text" name="name" placeholder='Enter your Name' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.Name}/>
                        <motion.input variants={variants} initial="initial1" whileInView="animate" type="text" name="email" placeholder='Enter your Email' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.email}/>
                        <motion.input variants={variants} initial="initial" whileInView="animate" type="password" name="password" id="" placeholder='Enter password' className='bg-transparent border-2 text-white lg:h-[30%] w-[100%] lg:w-[90%] p-5 border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.password}/>
                        <motion.input variants={variants} initial="initial1" whileInView="animate" type="text" name="Confirm password" placeholder='Enter your Confirm Password' className='bg-transparent border-2 text-white lg:h-[30%] p-5 w-[100%] lg:w-[90%] border-red-200 rounded-xl md:h-[10%] md:w-[70%] max-sm:h-[20%]' onChange={handleUserInput} value={signinData.cnfPassword}/>
                        <motion.button type='submit' variants={variants} initial="button" whileInView="animate" className='bg-orange-500 lg:h-[35%] h-full lg:w-[90%] max-md:h-[70%] w-[100%] rounded-xl md:w-[70%] max-sm:h-[20%]' >Submit</motion.button> 
                </form>
            </div>
        // </div> 
  
  )
}

export default Signup
