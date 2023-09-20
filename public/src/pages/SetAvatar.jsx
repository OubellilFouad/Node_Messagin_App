import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import {Buffer} from 'buffer'

function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945';
  const [avatars,setAvatars] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();
  const setProfilePicture = async () => {
    if(selectedAvatar === undefined){
        alert('Select an avatar');
    }else{
        const user = await JSON.parse(localStorage.getItem('chat_app_user'));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
            image: avatars[selectedAvatar]
        })
        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem('chat_app_user',JSON.stringify(user));
            navigate('/')
        }else{
            alert('Error setting avatar, try again')
        }
    }
  }

  const getImages = async () => {
    const data = [];
    setIsLoading(true);
    for(let i = 0; i<4;i++){
        const image = await axios.get(`${api}/${Math.random() * 1000}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
    }
    setIsLoading(false)
    setAvatars(data);
  }
  useEffect(() => {
    if(!localStorage.getItem('chat_app_user')){
      navigate('/login')
    }
  },[])
  useEffect(() => {
    getImages();
  },[])
  return (
    <div className='flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen'>
      {!isLoading && (
        <>
        <div>
        <h1 className='text-white text-3xl'>Pick an avatar</h1>
        </div>
        <div className='flex gap-8'>
            {
                avatars.map((avatar,index) => {
                    return(
                        <div key={index} className={`border-[0.4rem] p-[0.4rem] rounded-full flex justify-center items-center transition-[500ms_ease-in-out] ${selectedAvatar === index?'border-[#4e0eff]':'border-transparent'}`}>
                            <img className='h-24 cursor-pointer' src={`data:image/svg+xml;base64,${avatar}`} onClick={() => setSelectedAvatar(index)} alt="" />
                        </div>
                    )
                })
            }

        </div>
        <button className='bg-[#997af0] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-[0.4rem] text-base uppercase hover:bg-[#4e0eff] transition-all' onClick={setProfilePicture}>Set as profile picture</button>
        </>
      )}
      {isLoading && (
        <p className='text-white text-3xl'>Loading...</p>
      )}
    </div>
  )
}

export default SetAvatar
