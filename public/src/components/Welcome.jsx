import React from 'react'

function Welcome({user}) {
  return (
    <div className='flex justify-center items-center flex-col text-white'>
      <h1 className='text-3xl'>Welcome, <span className='text-[#4e0eff]'>{user.username}!</span></h1>
      <h3 className='text-xl'>Please select a chat to start messaging</h3>
    </div>
  )
}

export default Welcome
