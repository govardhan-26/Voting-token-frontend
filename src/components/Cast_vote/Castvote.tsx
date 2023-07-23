import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar'
// import './Castvote.css'
import { DefaultProvider, SensiletSigner, toHex } from 'scrypt-ts';
import { useElectioncreation } from '../Context'; 


const Castvote = () => {

  const { sensiletLogin, isConnected} = useElectioncreation(); 
  const [Name, setName] = useState("Govardhan");
  const [Email, setEmail] = useState("your@gmail.com");
  const [NID, setNID] = useState("1234 2354 2541 2365");
  const [age, setage] = useState("25");
  const [mobile, setmobile] = useState("1234567890");

    useEffect(() => {
        console.log(isConnected);
    }, )

  return (
    <div className="admin-Container flex">
        <Navbar/>
        <div className="profile text-[130%] w-full m-[8%] text-black flex flex-col items-center" >
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between '>
              <label ><b>Name</b></label>
              <p className=' rounded-[5px] pl-[3%]'>{Name}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between' >    
              <label ><b>Email</b></label>
              <p>{Email}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] mx-auto justify-between'>    
              <label><b>NID</b></label>
              <p className='text-center pl-24 ml-2'>{NID}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between '>    
              <label><b>Username</b></label>
              <p className='mx-auto pl-[10rem]'>{age}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between '>    
              <label><b>Username</b></label>
              <p className='mx-auto pl-[10rem]'>{mobile}</p>
          </div>            
          <div className="neucron flex p-[1%] m-[2%] w-[50%] mx-auto justify-between">
              <b>Connect to Wallet</b> 
              <button className='border-[0.5px] border-black rounded-[5px] bg-[#140026] mr-[2rem] text-[#E8E8E8] pt-[3px] pb-[3px] pl-[2px] pr-[2px] w-[20%]' onClick={sensiletLogin}> Connect</button>
          </div>
            
        </div>
    </div>
  )
}

export default Castvote