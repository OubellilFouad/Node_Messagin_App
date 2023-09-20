import React, { useEffect, useState } from 'react'

function Contacts({contacts, user, changeChat}) {
  const [userName,setUserName] = useState(undefined);
  const [userImage,setUserImage] = useState(undefined);
  const [userSelected,setUserSelected] = useState(undefined);
  const changeCurrentChat = (index,contact) => {
    setUserSelected(index);
    changeChat(contact)
  }
  useEffect(() => {
    if(user){
        setUserImage(user.avatarImage);
        setUserName(user.username);
    }
  },[user])  
  return <>
    {   
        userImage && userName && (
            <div className='grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420]'>
                <div className='flex justify-center items-center'>
                    <p className='text-white text-2xl'>Logo</p>
                </div>
                <div className='flex flex-col items-center overflow-y-scroll gap-3'>
                    {contacts?.map((contact,index) => {
                        return(
                            <div className={` min-h-[5rem] w-[90%] cursor-pointer rounded-md p-2 gap-4 flex items-center transition-all ${userSelected === index?'bg-[#9186f3]':'bg-[#ffffff39]'}`} onClick={() => changeCurrentChat(index,contact)} key={index}>
                                <div>
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} className=' h-12' alt="" />
                                </div>
                                <div>
                                    <h3 className='text-white text-xl'>
                                        {contact.username}
                                    </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='bg-[#0d0d30] flex justify-center items-center gap-8 currentUser'>
                    <div>
                        <img src={`data:image/svg+xml;base64,${userImage}`} className='h-16' alt="" />
                    </div>
                    <div>
                        <h2 className='text-white text-2xl'>
                            {userName} 
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
  </>
}

export default Contacts
