import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/auth';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function Logout() {
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            navigate('/');
        }
    }

    return (
        <nav className="mt-5 px-4 py-2 bg-gray-800 w-full sm:w-[90%] text-white flex flex-row items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-16 h-auto mr-2 cursor-pointer" />
        </Link>
      
        <ul className="flex flex-wrap gap-4 sm:gap-10 items-center justify-center sm:justify-end mt-4 sm:mt-0 w-full sm:w-auto">
          <li className="cursor-pointer hover:text-yellow-500">
            {isLoggedIn && role === 'Admin' ? (
              <Link to="/applicants">All Applications</Link>
            ) : isLoggedIn && role !== 'Admin' ? (
              <Link to="/application">My Applications</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </li>
      
          {isLoggedIn && role === 'Admin' && (
            <li className="cursor-pointer hover:text-yellow-500">
              <Link to="/post">Post</Link>
            </li>
          )}
      
          {isLoggedIn && (
            <li>
              <button onClick={Logout} className="text-white hover:text-yellow-500">
                Logout
              </button>
            </li>
          )}
      
          {!isLoggedIn && (
            <li className="cursor-pointer hover:text-yellow-500">
              <Link to="/signup">Sign Up</Link>
            </li>
          )}
      
          <li className="cursor-pointer hover:text-yellow-500">
            <Link to="/Internship">Internship</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500">
            <Link to="/Job">Job</Link>
          </li>
        </ul>
      </nav>
      
    );
};

export default Navbar;
