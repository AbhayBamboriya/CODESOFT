import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Slices/auth'



const Navbar = () => {
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector((state)=>state.auth.role)
      const dispatch=useDispatch()
    async function Logout(){
        await dispatch(logout())
     }
  return (
    <nav className='mt-[5%]  w-full text-white flex gap-10 justify-around'>
                    <Link to='/'><img src={logo} alt="" srcset="" className='w-[10%] h-full cursor-pointer'/></Link>

                    {/* <img src={logo} alt="" srcset="" className='w-[3%] h-full cursor-pointer'/> */}
                    <ul className='margin-auto flex gap-10 items-center'>
                        <li className='cursor-pointer hover:text-yellow-500'>{
                            isLoggedIn && role=='Admin' ? <Link to="/applicants">All Application</Link> :
                            isLoggedIn && role!='Admin' ? <Link to="/application">My Application</Link> : <Link to="/signin">Sign In</Link>
                            
                        }</li>
                        {isLoggedIn && role=='Admin' && <Link to="/post">Post</Link>}
                        {isLoggedIn  && <button onClick={Logout}>Logout</button>}
                        {!isLoggedIn && <li className='cursor-pointer hover:text-yellow-500'><Link to='/signup'>Sign Up</Link></li>}
                        <li className='cursor-pointer hover:text-yellow-500'><Link to='/Internship'>Internship</Link></li>
                        <li className='cursor-pointer hover:text-yellow-500'><Link to='/Job'>Job</Link></li>
                    </ul>
                </nav>
  )
}

export default Navbar
