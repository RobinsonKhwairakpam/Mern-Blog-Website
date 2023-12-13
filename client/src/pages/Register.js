import React, { useState } from 'react'

const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function register(e){
    e.preventDefault()
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),        //converts a JavaScript value to a JSON string
      headers: {'Content-Type': 'application/json'}     //since we send json, we need to specify the content-type
    })

    if(response.status === 200){
      alert('Registration Successful!')
    }else{
      alert('Registration Failed!')
    }
  }

  return (
    <form onSubmit={register} className='max-w-md mx-auto mt-12'>
      <h1 className='font-bold text-2xl text-center mb-5'>Register</h1>
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
        Register
      </button>
    </form>
  )
}

export default Register