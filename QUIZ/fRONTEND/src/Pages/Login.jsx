import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slices/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    
    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        if (!loginData.email || !loginData.password) {
            setLoading(false); // Reset loading state
            return toast.error('Please fill all the details', {
                position: "top-right",
            });
        }

       

        try {
            const response = await dispatch(login(loginData));
            console.log('checkicvdfiddif',response);
            if (response?.payload?.success) {
                navigate('/mainpage');
                toast.success("Login successful!", {
                    position: "top-right",
                    // autoClose:3000
                });
            } 
        } catch (error) {
            // console.error("Login error:", error);
            toast.error("An error occurred. Please try again later.", {
                position: "top-right",
            });
        } finally {
            setLoading(false); // Reset loading state
        }

        setLoginData({
            email: "",
            password: "",
        });
    };

    return (
        <div>
            <div className="flex items-center justify-center backdrop-brightness-90 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                <div className="flex items-center justify-center h-[100vh]">
                    <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                        <h1 className="text-center text-2xl font-bold">
                            Login Page
                        </h1>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="Enter your Email"
                                className="bg-transparent px-2 py-1 border"
                                onChange={handleUserInput}
                                value={loginData.email}
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
                                value={loginData.password}
                            />
                        </div>

                        <ToastContainer />

                        <button type="submit" 
                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                        // className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer"
                        >
                         
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                                    <span className='inline-flex w-full h-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                                    {loading ? 'Logging in...' : 'Login'}
                            </span>
                        </button>

                        <p className="text-center">Don't have an Account? <Link to='/signup' className="link text-accent cursor-pointer">Signup</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
