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
    <div className='py-4 px-10 text-center bg-[#171a32] font-semibold w-full text-[17px] text-white font-[Poppins] shadow-xl'>
        <ul className='flex justify-between items-center'>
            <div>
                <li className='py-4 flex items-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clip-rule="evenodd" />
                    </svg>
                    <Link to='/' className='pl-3 pr-8'>
                        My Blogs
                    </Link>
                </li>
            </div>

            <div className='flex justify-center items-center gap-4'>
                <li className=' py-2 '>
                    <Link to='/about' className='p-4 rounded-md'>
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
                        <li className=' py-2 '>
                            <Link to='/create' className='p-4 '>
                                Create Post
                            </Link>
                        </li>
                        <li className=' py-2 '>
                            <div onClick={logout} className='p-2 hover:cursor-pointer'>
                                Logout
                            </div>
                        </li>
                    </>
                }

                {
                    !username &&
                    <>
                        <li className=' py-2 '>
                            <Link to='/login' className='p-4 '>
                                Login
                            </Link>
                        </li>
                        <li className=' py-2 '>
                            <Link to='/register' className='p-4'>
                                Register
                            </Link>
                        </li>
                    </>
                }
            </div>
        </ul>
    </div>
  )
}

export default Navbar