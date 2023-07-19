import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar'
import './Admin_dashboard.css'
import { DefaultProvider, SensiletSigner, toHex } from 'scrypt-ts';
import { useElectioncreation } from '../Context'; 

const Admin_dashboard = () => {

  const { sensiletLogin, isConnected} = useElectioncreation(); 
  const [Name, setName] = useState("Shubham Goutham");
  const [Email, setEmail] = useState("shubh@gmail.com");
  const [NID, setNID] = useState("1234 2013 2548 2312");
  const [Username, setUsername] = useState("Shubh");

    useEffect(() => {
        console.log(isConnected);
    }, )

  return (
    <div className="admin-Container">
        <Navbar/>
        <div className="profile">
          <div>
              <label ><b>Name</b></label>
              <p>{Name}</p>
          </div>
          <div>    
              <label ><b>Email</b></label>
              <p>{Email}</p>
          </div>
          <div>    
              <label ><b>NID</b></label>
              <p>{NID}</p>
          </div>
          <div>    
              <label ><b>Username</b></label>
              <p>{Username}</p>
          </div>            
          <div className="neucron">
              <b>Connect to Wallet</b> 
              <button onClick={sensiletLogin}> Connect</button>
          </div>   
        </div>
    </div>
  )
}

export default Admin_dashboard