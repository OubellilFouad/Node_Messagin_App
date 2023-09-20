import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiPowerOff } from 'react-icons/bi'

function Logout() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }
  return (
    <div onClick={handleClick} className='flex justify-center items-center p-2 rounded-lg bg-[#9a86f3] border-none cursor-pointer'>
      <BiPowerOff className=' text-xl text-[#ebe7ff]'/>
    </div>
  )
}

export default Logout
