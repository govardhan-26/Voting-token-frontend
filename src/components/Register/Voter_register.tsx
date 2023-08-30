import React, { useState } from 'react'
import login_admin from '../../assets/admin_login.svg'
import voter_admin from '../../assets//voter_login.svg'
import neucron from '../../assets/neucron.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { addDoc,collection,doc,setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useElectioncreation } from '../Context'

const Voter_register = () => {
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const {token,setToken, Email, setEmail, Name, setName, NID, setNID, Username, setUsername} = useElectioncreation();

    const Register = (e : any) => {
        e.preventDefault();
        Axios.post('https://dev.neucron.io/auth/signup', {
            "email": Email,
            "password": password
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })
        .then((response)=>{
            const userData = response.data.data; // Assuming this contains user data
            const accessToken = userData.access_token;
            const user_id = userData.user_id;
            setToken(accessToken);
            
            // Extend userData with additional properties
            userData.email = Email;
            userData.name = Name; // Replace with actual user name
            userData.nid =  NID; // Replace with actual NID
            userData.username = Username; // Replace with actual username
            userData.isVoted = false;
            
            // Reference the 'users' collection and use the access token as the document ID
            const userDocRef = doc(db, 'users', user_id);
            
            // Set the user data in the document
            setDoc(userDocRef, userData)
              .then(() => {
                console.log('User data added successfully!');
                Navigate('/voter_dashboard');
              })
              .catch((error) => {
                console.error('Error adding user data: ', error);
              });
    })
    }
  return (
    <div>
        <div>
        <div className="main-container">
            <div className="container">
                <div className='heading'>
                    <h1>Voter Register</h1>
                </div>
                <div className="selection-container">
                    <div className="selection">
                        <Link to='/voter_register' className='selection-voter'><img src={voter_admin} alt="Voter"/></Link>
                    </div>
                    <div className="selection">
                        <Link to='/admin_register' className='selection-admin'><img src={login_admin} alt="Admin"/></Link>
                    </div>
                </div>
                <div className='register-form'>
                <form action="" className="login-form" onSubmit={Register}>
                    <label htmlFor="email">Email</label>
                    <input className='border border-gray-300 rounded-2' type="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                    <input className='border border-gray-300 rounded-2' type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <label htmlFor="password">Confirm Password</label>
                    <input className='border border-gray-300 rounded-2' type="password" id="password" placeholder="password"/>
                    <label htmlFor="name">Name</label>
                    <input className='border border-gray-300 rounded-2' type="text" id="name" placeholder="name" onChange={(e)=>{setName(e.target.value)}}/>
                    <label htmlFor="user_name">User name</label>
                    <input className='border border-gray-300 rounded-2' type="text" id="user_name" placeholder="user_name" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <label htmlFor="nid">NID</label>
                    <input className='border border-gray-300 rounded-2' type="text" id="nid" placeholder="nid" onChange={(e)=>{setNID(e.target.value)}}/>
                    <button className="login-button">Register</button>
                    <p className="no-acnt">Already Had an Account ? <a href="/voter_login">Login</a></p>
                    {/* <div className="neucron">
                        <p className="neucron-button">Register Using Neucron </p>
                        <img src={neucron} alt="Neucron"/>
                    </div> */}
                </form> 
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Voter_register