import React, { useState } from 'react'
import Voter_navbar from './Voter_navbar'
import { useElectioncreation } from '../Context';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { doc,getDoc} from 'firebase/firestore';
interface UserData {
  name: string;
  email: string;
  nid: string;
  username: string;
  // Add other fields as needed
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const { token, setToken} = useElectioncreation();

  useEffect(() => {
   

    const fetchUserInfo = async () => {
      const docRef = doc(db, 'users', token);

      try {
        const docData = (await getDoc(docRef)).data();
        if (docData) {
          setUserInfo(docData as UserData); // Cast docData to UserData
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const { sensiletLogin,myAddress, isConnected} = useElectioncreation(); 
  const [Name, setName] = useState("Shubham Goutham");
  const [Email, setEmail] = useState("shubh@gmail.com");
  const [NID, setNID] = useState("1234 2013 2548 2312");
  const [Username, setUsername] = useState("Shubh");
  return (
    <div className='flex'>
        <Voter_navbar/>
        {userInfo && Object.keys(userInfo).length > 0 && (
          <div>
            <div className='flex p-[1%] m-[2%] w-[50%] justify-between '>
              <label><b>Name</b></label>
              <p className=' rounded-[5px] pl-[3%]'>{userInfo.name}</p>
            </div>
            {/* ... Other user info rendering ... */}
          </div>
        )}
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
              <p className='mx-auto pl-[10rem]'>{Username}</p>
          </div>            
          <div className="flex p-[1%] m-[2%] w-[50%] mx-auto justify-between">
              <b>Connect to Wallet</b> 
              <button className='border-[0.5px] border-black rounded-[5px] bg-[#140026] mr-[2rem] text-[#E8E8E8] pt-[3px] pb-[3px] pl-[2px] pr-[2px] w-[20%]' onClick={sensiletLogin}> Connect</button>
          </div>
        </div>
    </div>
  )
}

export default Dashboard