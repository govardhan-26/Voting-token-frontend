import React, { useState } from 'react'
import Voter_navbar from './Voter_navbar'
import { useElectioncreation } from '../Context';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { doc,getDoc} from 'firebase/firestore';
import Axios from 'axios';
interface UserData {
  name: string;
  email: string;
  nid: string;
  username: string;
  // Add other fields as needed
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const { token } = useElectioncreation();

  useEffect(() => {
    console.log("token============", token);
    const fetchUserInfo = async () => {
      try {
        const response = await Axios.get('https://dev.neucron.io/user/info', {
          headers: {
            Authorization: `${token}`, // Include access token in the authorization header
          },
        });

        const userData = response.data;
        console.log(userData.data.id);

        // Fetch Firestore document using the user ID
        const docRef = doc(db, 'users', userData.data.id);

        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          console.log(docData)
          setUserInfo(docData as UserData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token]);

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
              <p className='rounded-[5px] pl-[3%]'>{userInfo.name}</p>
            </div>
            <div className='flex p-[1%] m-[2%] w-[50%] justify-between'>    
              <label><b>Email</b></label>
              <p>{userInfo.email}</p>
            </div>
            <div className='flex p-[1%] m-[2%] w-[50%] mx-auto justify-between'>    
              <label><b>NID</b></label>
              <p className='text-center pl-24 ml-2'>{userInfo.nid}</p>
            </div>
            <div className='flex p-[1%] m-[2%] w-[50%] justify-between '>    
              <label><b>Username</b></label>
              <p className='mx-auto pl-[10rem]'>{userInfo.username}</p>
            </div>
             
            {/* Display other user information fields here */}
          </div>
        )}
        
        {/* ... (Rest of the component code) */}
    </div>
  )
}

export default Dashboard