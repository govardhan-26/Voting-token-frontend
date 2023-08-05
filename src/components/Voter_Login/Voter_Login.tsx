import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Admin/Navbar'
// import './Admin_dashboard.css'
import { DefaultProvider, SensiletSigner, toHex } from 'scrypt-ts';
import { useElectioncreation } from '../Context';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import getFirebase from '../../firebase';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const Voter_Login = () => {

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    const email = JSON.stringify(user.email);
    setCurrentUser(email);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
    
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("User Signed in Successfully");
  };

 const url = 'https://api.neucron.io/auth/login_google';

// Your API key
  const apiKey = 'lkjlkjlkjlkjlkjlkjlkjlkj';

  async function makeGetRequest() {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
  
      console.log('Response data:', response.data);
      // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occurred during the request
    }
  }

  return (
    <div className="admin-Container flex">
      <Navbar />
      <button
        onClick={handleLogin}
        className="flex items-center justify-center w-full px-4 py-2 text-sm text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-4 h-4 mr-2"
          viewBox="0 0 48 48"
        >
          {/* Google logo SVG code */}
        </svg>
        Google
      </button>
      <button
        onClick={makeGetRequest}
        className="flex items-center justify-center w-full px-4 py-2 text-sm text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-4 h-4 mr-2"
          viewBox="0 0 48 48"
        >
          {/* Google logo SVG code */}
        </svg>
        Necron Connect to google
      </button>
      {currentUser
          ? `The current logged in user is: ${currentUser}.`
          : "No user is currently logged in."}
    </div>
  );
};

export default Voter_Login