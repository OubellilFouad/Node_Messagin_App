import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMsg, sendMsg } from '../utils/APIRoutes'
import {v4} from 'uuid'

function ChatCon({currentChat,user,socket}) {
  const [messages,setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const handleSend = async (msg) => {
    await axios.post(sendMsg, {
        from: user._id,
        to: currentChat._id,
        msg: msg
    })
    socket.current.emit('send-msg', {
      from: user._id,
      to: currentChat._id,
      msg: msg
    })
    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  }

  useEffect(() => {
    if(socket.current){
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({fromSelf:false,message: msg})
      });
    }
  },[])
  
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev,arrivalMessage]);
  },[arrivalMessage])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behaviour: "smooth"});
  },[messages])

  const getMessages = async () => {
    if(currentChat){
      const response = await axios.post(getAllMsg, {
        from: user?._id,
        to: currentChat?._id
      })
      setMessages(response.data);
    }
  }
  useEffect(() => {
    getMessages();
  },[currentChat])
  return (
    <div className='pt-4 grid grid-rows-[10%_78%_12%] gap-1 overflow-hidden'>
      <div className='flex justify-between items-center px-8'>
        <div className='flex items-center gap-4'>
            <div>
                <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} className='h-16' alt="" />
            </div>
            <div>
                <h3 className='text-white text-xl'>{currentChat?.username}</h3>
            </div>
        </div>
        <Logout/>
      </div>
      <div className='py-4 px-8 flex flex-col gap-4 overflow-auto'>
        {messages.map((msg,index)=> {
            return(
                <div ref={scrollRef} key={index}>
                    <div className={`flex items-center ${msg.fromSelf?'justify-end':'justify-start'}`}>
                        <div className={`max-w-[14%] break-words p-4 text-lg rounded-2xl text-[#d1d1d1] ${msg.fromSelf?'bg-[#4f04ff21]':'bg-[#9900ff20]'}`}>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
      <ChatInput handleSend={handleSend} />
    </div>
  )
}

export default ChatCon
