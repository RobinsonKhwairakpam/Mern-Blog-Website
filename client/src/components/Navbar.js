import React, { useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {

    const {userInfo, setUserInfo} = useContext(UserContext)

    //get User Info from the cookie token
    const getUserInfo = async () => {
        const response = await fetch('http://localhost:8000/profile', {
            credentials: 'include'
        })
        const userInfo = await response.json()
        setUserInfo(userInfo)
    }

    //check if there is user info from cookie when component is mounted
    useEffect(() => {
        getUserInfo()
    }, [])

    const logout = () => {
        fetch('http://localhost:8000/logout', {
            method: 'POST',
            credentials: 'include'
        })
        setUserInfo(null)  
        alert('Successfully logged out')  
        return <Navigate to={'/'} />
    }

    const username = userInfo?.username

  return (
    <div className='p-3 text-center bg-[#21252d] font-bold w-full text-lg text-white'>
        <ul>
            <li className='inline-block py-4'>
                <Link to='/' className='pl-6 pr-8'>
                    Blogs
                </Link>
            </li>
            <li className='inline-block py-4'>
                <Link to='/about' className='pl-6 pr-8'>
                    About
                </Link>
            </li>
            {/* <li className='inline-block py-4'>
                <Link to='/articles-list' className='pl-6 pr-8'>
                    Articles
                </Link>
            </li> */}

            {
                username && 
                <>
                    <li className='inline-block py-4'>
                        <Link to='/create' className='pl-6 pr-8'>
                            Create Post
                        </Link>
                    </li>
                    <li className='inline-block py-4'>
                        <div onClick={logout} className='pl-6 pr-8 hover:cursor-pointer'>
                            Logout ({username})
                        </div>
                    </li>
                </>
            }

            {
                !username &&
                <>
                    <li className='inline-block py-4'>
                        <Link to='/login' className='pl-6 pr-8'>
                            Login
                        </Link>
                    </li>
                    <li className='inline-block py-4'>
                        <Link to='/register' className='pl-6 pr-8'>
                            Register
                        </Link>
                    </li>
                </>
            }
            
        </ul>
    </div>
  )
}

export default Navbar