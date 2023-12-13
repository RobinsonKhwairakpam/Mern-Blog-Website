import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(e){
    e.preventDefault()
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),        //converts a JavaScript value to a JSON string
      headers: {'Content-Type': 'application/json'},     //since we send json, we need to specify the content-type
      credentials: 'include'                             //include cookies in the browser
    })

    if(response.ok){
      const resUserInfo = await response.json()
      setUserInfo(resUserInfo)
      setRedirect(true)
    }else{
      alert('Wrong credentials!')
    }
  }

  //when succesfully logged in, redirect to Home
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={login} className='max-w-md mx-auto mt-12'>
      <h1 className='font-bold text-2xl text-center mb-5'>Login</h1>
      <input 
        className='block w-full mb-5 border-2 border-gray-300 rounded-md p-2 bg-[#fff]' 
        type='text' 
        placeholder='Username' 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        className='block w-full mb-5 border-2 border-gray-300 rounded-md p-2 bg-[#fff]' 
        type='password' 
        placeholder='Password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        className='w-full block bg-green-700 border-0 text-[#fff] rounded-md py-2'
      >
        Login
      </button>
    </form>
  )
}

export default Login