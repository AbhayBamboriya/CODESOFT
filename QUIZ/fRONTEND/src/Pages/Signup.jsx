import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail } from '../../Helpers/RegexMatcher';
import {createAccount}  from '../../Redux/Slices/AuthSlice'
import { toast } from 'react-toastify';


const Signup = () => {
  const dispatch =useDispatch();
    const navigate=useNavigate();
    const [signupData,setSignupData]=useState({
        Name:"",
        email:"",
        password:"",
        role:""
    })
    const [loading, setLoading] = useState(false);
    function handleUserInput(e){
        const {name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    


    const notifySuccess = (message, toastId) => {
        toast.update(toastId, {
            render: message,
            type: "success",
            autoClose: 5000,
            isLoading: false,
        });
    };

    const notifyError = (message, toastId) => {
        toast.update(toastId, {
            render: message,
            type: "error", 
            autoClose: 5000,
            isLoading: false,
        });
    };
   

    async function createNewAccount(e){
        e.preventDefault();
        console.log('dffk');
        setLoading(true)
        if(!signupData.role || !signupData.email || !signupData.Name || !signupData.password){
            setLoading(false)
              return toast.error('Please fill all the details', {
                position: "top-right",
            });
        }

        console.log('sdksdjs');
        if(signupData.Name.length<5){
            setLoading(false)
            return toast.error('Name should be atleast of 5 characters', {
              position: "top-right",
          });
        }

        console.log('klhjk');
        if(!isEmail(signupData.email)){
            setLoading(false)
             return toast.error('Invalid Email Id', {
              position: "top-right",
          });
        }
      
        console.log('skaaowqwowwqoqwwqiw');
      
        if(signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/)){
            setLoading(false)
            return toast.error('Password should contain at least 8 character 1 digit 1 lower case 1 uppercase', {
              position: "top-right",
          });


        }

        const response=await dispatch(createAccount(signupData))
        // going o home page
        console.log('respone- '+response.payload);
        if(response?.payload?.success) {
            notifySuccess("Registration Completed!");
            navigate('/mainPage')
        } else{
            notifyError("Registration failed. Please try again.");
        }


        setSignupData({
            Name:"",
            email:"",
            password:"",
            // avatar:""
            role:''
        })



    }
    return (
        <div>
        <div className="flex items-center justify-center backdrop-brightness-90 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            <div className="flex items-center justify-center h-screen w-[75%]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-11/12 sm:w-2/5 md:w-2/8 lg:w-1/2 bg-blak xl:w-1/3 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Registration Page
                    </h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input type="text"
                            required
                            name="Name"
                            id="Name"
                            placeholder="Enter your name..."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.Name}
                            />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your Email"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={setSignupData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={setSignupData.password}
                        />
                    </div>
    
                    <select id="options" style={{ backgroundColor: 'transparent' }} className="bg-transparent mt-1 block w-full border text-3 md:h-[10%] lg:h-[10%]  max-sm:h-[20%] border-gray-300 bg-white p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signupData.role} onChange={handleUserInput}>
                        <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Role</option>
                        <option value="Teacher" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Teacher</option>
                        <option value="Student" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Student</option>
                    </select>

                    <button type="submit" 
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                        // className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer"
                        >
                         
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                                    <span className='inline-flex w-full h-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                                    { loading ? 'Creating Account....':'Create Account'}
                            </span>
                        </button>
                    <p className="text-center">Already have an Account ? <Link to='/login' className="link hover:text-emerald-300 cursor-pointer">Login</Link></p>

                    
    
                </form>
            </div>
        </div>
    </div>























        // <div className='flex items-center justify-center backdrop-brightness-90 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
        //     <div className="flex items-center justify-center h-[100vh] "> 
        //         <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
        //             <h1 className="text-center text-2xl font-bold">
        //                 Registration Page
        //             </h1>
        //             <div className="flex flex-col gap-1">
        //                 <label htmlFor="fullName" className="font-semibold">Name</label>
        //                 <input type="text"
        //                     required
        //                     name="Name"
        //                     id="Name"
        //                     placeholder="Enter your name..."
        //                     className="bg-transparent px-2 py-1 border"
        //                     onChange={handleUserInput}
        //                     value={signupData.Name}
        //                     />
        //             </div>
        //             <div className="flex flex-col gap-1">
        //                 <label htmlFor="email" className="font-semibold">Email</label>
        //                 <input type="email"
        //                     required
        //                     name="email"
        //                     id="email"
        //                     placeholder="Enter your Email"
        //                     className="bg-transparent px-2 py-1 border"
        //                     onChange={handleUserInput}
        //                     value={signupData.email}
        //                     />
        //             </div>
        //             <div className="flex flex-col gap-1">
        //                 <label htmlFor="password" className="font-semibold">Password</label>
        //                 <input type="password"
        //                     required
        //                     name="password"
        //                     id="password"
        //                     placeholder="Enter your password"
        //                     className="bg-transparent px-2 py-1 border"
        //                     onChange={handleUserInput}
        //                     value={signupData.password}
        //                     />
        //             </div>
        //             {/* ype-sumbmit page will get refresh */}

        //             <select id="options" style={{ backgroundColor: 'transparent' }} className="bg-transparent mt-1 block w-full border text-3 md:h-[10%] lg:h-[10%]  max-sm:h-[20%] border-gray-300 bg-white p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={signupData.role} onChange={handleUserInput}>
        //                 <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Role</option>
        //                 <option value="Teacher" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Teacher</option>
        //                 <option value="Student" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Student</option>
        //             </select>
                    

        //             <button type="submit" 
        //                 className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
        //                 // className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer"
        //                 >
                         
        //                     <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
        //                             <span className='inline-flex w-full h-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
        //                             { loading ? 'Creating Account....':'Create Account'}
        //                     </span>
        //                 </button>
        //             <p className="text-center">Already have an Account ? <Link to='/login' className="link hover:text-emerald-300 cursor-pointer">Login</Link></p>
        //         </form>

        //     </div>
        //  </div>
)}

export default Signup
