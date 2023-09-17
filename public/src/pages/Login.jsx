import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

function Login() {
  const navigate = useNavigate();
  const  [values,setValues] = useState({
    username: '',
    password: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const {password,username} = values;
      const {data} = await axios.post(loginRoute,{
        username,
        password
      })
      if(data.status === false){
        alert(data.msg)
      }
      if(data.status === true){
        alert('Success');
        localStorage.setItem('chat_app_user',JSON.stringify(data.user))
        navigate('/')
      }
    };
  }

  const handleValidation = () => {
    const {password,username} = values;
    if(username.length === 0){
      alert('username is required');
      return false
    }else if(password.length === 0){
      alert('password is required');
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
          <input className='rounded-[0.4rem] bg-transparent p-3 border-2 border-[#4e0eff] text-white w-full text-base focus:border-[#997af0] focus:outline-none' type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} min={3}/>
          <input className='rounded-[0.4rem] bg-transparent p-3 border-2 border-[#4e0eff] text-white w-full text-base focus:border-[#997af0] focus:outline-none' type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)}/>
          <button type='submit' className='bg-[#997af0] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-[0.4rem] text-base uppercase hover:bg-[#4e0eff] transition-all w-full'>Login</button>
          <span className='text-white uppercase text-sm'>Don't have an account? <Link className='text-[#4e0eff]' to={'/register'}>Sign up</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login
