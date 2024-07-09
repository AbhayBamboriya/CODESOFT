import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slices/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx'; // Import clsx

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!loginData.email || !loginData.password) {
            setLoading(false);
            return toast.error('Please fill all the details', {
                position: 'top-right',
            });
        }

        try {
            const response = await dispatch(login(loginData));
            console.log('Login response:', response);
            if (response?.payload?.success) {
                toast.success('Login successful!');
                navigate('/mainpage');
            } else {
                toast.error('Login failed. Please check your credentials.', {
                    position: 'top-right',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred. Please try again later.', {
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }

        setLoginData({
            email: '',
            password: '',
        });
    };

    return (
        <div>
            <div className="flex items-center justify-center backdrop-brightness-90 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
                <div className="flex items-center justify-center h-screen w-[75%]">
                    <form
                        noValidate
                        onSubmit={onLogin}
                        className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-11/12 sm:w-2/5 md:w-2/8 lg:w-1/2 bg-blak xl:w-1/3 shadow-[0_0_10px_black]"
                    >
                        <h1 className="text-center text-2xl font-bold">
                            Login Page
                        </h1>

                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="email"
                                className="font-semibold"
                            >
                                Email
                            </label>
                            <input
                                type="email"
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
                            <label
                                htmlFor="password"
                                className="font-semibold"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="bg-transparent px-2 py-1 border"
                                onChange={handleUserInput}
                                value={loginData.password}
                            />
                        </div>

                        {/* Ensure ToastContainer is rendered */}
                        <ToastContainer />

                        <button
                            type="submit"
                            className={clsx(
                                'relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50',
                                {
                                    'bg-gray-950': !loading,
                                    'bg-green-600': loading,
                                }
                            )}
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex w-full h-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
                                {loading ? 'Logging in...' : 'Login'}
                            </span>
                        </button>

                        <p className="text-center">
                            Don't have an Account?{' '}
                            <Link
                                to="/signup"
                                className="hover:text-emerald-300 cursor-pointer"
                            >
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
