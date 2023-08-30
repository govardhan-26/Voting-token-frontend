import React, { useState, useEffect } from 'react';
import { useElectioncreation } from '../Context';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Axios from 'axios';
import Navbar from './Navbar';

interface UserData {
  user_id: string;
  name: string;
  email: string;
  nid: string;
  username: string;
  wallet_address: string;
  pub_key: string;
  // Add other fields as needed
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const { myAddress } = useElectioncreation();
  const { token } = useElectioncreation();
  const myPubkey = useElectioncreation();
  const { sensiletLogin, isConnected } = useElectioncreation();

  const performAnotherFunction = async () => {
    try {
      // Code for the additional function
      console.log(myPubkey.myPubkey);

      // Add myPubkey.myPubkey to the user document
      if (userInfo !== null) {
        const userDoc = doc(db, 'users', userInfo.user_id);
        await updateDoc(userDoc, {
          sens_pub_key: myPubkey.myPubkey,
        });
        console.log('myPubkey added to the user document successfully');
      }
    } catch (error) {
      console.error('Error adding myPubkey to the user document:', error);
    }
  };

  const handleClick = async () => {
    await sensiletLogin();
    await performAnotherFunction();
  };

  useEffect(() => {
    console.log('token============', token);
    const fetchUserInfo = async () => {
      try {
        const response = await Axios.get('https://dev.neucron.io/user/info', {
          headers: {
            Authorization: `${token}`,
          },
        });

        const userData = response.data;
        console.log(userData.data.id);

        const docRef = doc(db, 'users', userData.data.id);

        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          console.log(docData);
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

  useEffect(() => {
    console.log(isConnected);
  }, []);

  return (
    <div className='flex'>
      <Navbar />
      {userInfo && Object.keys(userInfo).length > 0 && (
        <div className='profile text-[130%] w-full h-[90vh] text-black flex flex-col items-center'>
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between'>
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
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between'>
            <label><b>Username</b></label>
            <p className='mx-auto pl-[10rem]'>{userInfo.username}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between'>
            <label><b>Wallet Address</b></label>
            <p>{userInfo.wallet_address}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] justify-between'>
            <label><b>Public Key</b></label>
            <p>{userInfo.pub_key}</p>
          </div>
          <div className='flex p-[1%] m-[2%] w-[50%] mx-auto justify-between'>
            <b>Connect to Wallet</b>
            <button
              className='border-[0.5px] border-black rounded-[5px] bg-[#140026] mr-[2rem] text-[#E8E8E8] pt-[3px] pb-[3px] pl-[2px] pr-[2px] w-[20%]'
              onClick={handleClick}
            >
              Connect
            </button>
          </div>
        </div>
      )}

      {/* ... (Rest of the component code) */}
    </div>
  );
};

export default Dashboard;
