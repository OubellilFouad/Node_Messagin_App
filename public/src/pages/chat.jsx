import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { allUsers, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatCon from '../components/ChatCon';

function Chat() {
  const socket = useRef();
  const [contacts,setContacts] = useState([]);
  const [user,setUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const getUsers = async () => {
    if(user){
      if(user.isAvatarImageSet){
        const {data} = await axios.get(`${allUsers}/${user._id}`);
        setContacts(data)
      }else{
        navigate('/setAvatar')
      }
    }
  }
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  useEffect(() => {
    if(!localStorage.getItem('chat_app_user')){
      navigate('/login')
    }else{
      setUser(JSON.parse(localStorage.getItem('chat_app_user')));
      setIsLoaded(true)
    }
  }, [])
  useEffect(() => {
    if(user){
      socket.current = io(host);
      socket.current.emit('add-user',user._id);
    }
  },[user])
  useEffect(() => {
    getUsers()
  }, [user])
  return (
    <div className='h-screen flex flec-col justify-center gap-4 items-center bg-[#131324]'>
      <div className='h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%_75%] con rounded-2xl overflow-hidden'>
        <Contacts contacts={contacts} user={user} changeChat={handleChatChange} />
        {currentChat === undefined && isLoaded?(<Welcome user={user} />):(<ChatCon user={user} currentChat={currentChat} socket={socket}/>)}
      </div>
    </div>
  )
}

export default Chat
