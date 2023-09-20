import React, { useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

function ChatInput({handleSend}) {
  const [showEmoji,setShowEmoji] = useState(false);
  const [msg,setMsg] = useState("");  
  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message)
  }
  const sendChat = (e) => {
    e.preventDefault();
    if(msg.length > 0){
        handleSend(msg);
        setMsg('');
    }
  }
  useEffect(() => {
    // console.log(msg)
  },[msg])
  return (
    <div className='grid grid-cols-[5%_95%] items-center bg-[#080420] p-[0_2rem] py-1'>
      <div className='flex items-center text-white gap-4'>
        <div className='relative emoji'>
            <BsEmojiSmileFill onClick={() => setShowEmoji(!showEmoji)} className=' text-2xl text-[#ffff00c8] cursor-pointer'/>
            {showEmoji && (<div className='picker'><Picker onEmojiClick={(e) => handleEmojiClick(e)}/></div>)}
        </div>
      </div>
      <form onSubmit={(e) => sendChat(e)} className='w-[100%] rounded-3xl flex items-center gap-8 bg-[#ffffff34]'>
        <input onChange={(e) => setMsg(e.target.value)} value={msg} className='w-[90%] h-[60%] bg-transparent text-white border-none pl-4 text-xl selection:bg-[#9a86f3] focus:outline-none' type="text" placeholder='Type something' />
        <button type='submit' className=' py-1 px-8 rounded-3xl flex justify-center items-center bg-[#9a86f3]'>
            <IoMdSend className='text-3xl text-white'/>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
