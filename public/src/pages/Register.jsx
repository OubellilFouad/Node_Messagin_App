import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'

function Register() {
  const navigate = useNavigate();
  const  [values,setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const {password,username,email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password
      })
      if(data.status === false){
        alert('Error')
      }
      if(data.status === true){
        alert('Success');
        localStorage.setItem('chat_app_user',JSON.stringify(data.user))
        navigate('/login')
      }
    };
  }

  const handleValidation = () => {
    const {password,confirmPassword,username,email} = values;
    if(password !== confirmPassword){
      alert('passwords not matching');
      return false
    }else if(username.length < 3){
      alert('username should contain at least 3 characters');
      return false
    }else if(password.length < 8){
      alert('password should contain at least 8 characters');
      return false
    }
    return true
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }
  useEffect(() => {
    if(localStorage.getItem('chat_app_user')){
      navigate('/')
    }
  },[])
  return (
    <>
      <div className='h-screen flex flex-col justify-center gap-4 items-center bg-[#131324]'>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center gap-8 bg-[#00000076] rounded-3xl py-12 px-20'>
          <div className='flex justify-center items-center'>
            <h1 className='text-white text-3xl'>LOGO</h1>
          </div>
          <input className='rounded-[0.4rem] bg-transparent p-3 border-2 border-[#4e0eff] text-white w-full text-base focus:border-[#997af0] focus:outline-none' type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)}/>
          <input className='rounded-[0.4rem] bg-transparent p-3 border-2 border-[#4e0eff] text-white w-full text-base focus:border-[#997af0] focus:outline-none' type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)}/>
          <input className='rounded-[0.4rem] bg-transparent p-3 border-2 border-[#4e0eff] text-white w-full text-base focus:border-[#997af0] focus:outline-none' type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)}/>
          <input className='rounded-[0.4rem] bg-transparent p-3 border-2 border-[#4e0eff] text-white w-full text-base focus:border-[#997af0] focus:outline-none' type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)}/>
          <button type='submit' className='bg-[#997af0] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-[0.4rem] text-base uppercase hover:bg-[#4e0eff] transition-all w-full'>Create user</button>
          <span className='text-white uppercase text-sm'>Already have an account? <Link className='text-[#4e0eff]' to={'/login'}>Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default Register
