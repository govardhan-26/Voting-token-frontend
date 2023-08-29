import React, { useState } from 'react'
import './Admin_register.css'
import login_admin from '../../assets/admin_login.svg'
import voter_admin from '../../assets//voter_login.svg'
import neucron from '../../assets/neucron.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { addDoc,collection,doc,setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useElectioncreation } from '../Context'

const Voter_register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [NID, setNID] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const {token,setToken} = useElectioncreation();

    const Register = (e : any) => {
        e.preventDefault();
        Axios.post('https://dev.neucron.io/auth/signup', {
            "email": email,
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
            userData.email = email;
            userData.name = name; // Replace with actual user name
            userData.nid =  NID; // Replace with actual NID
            userData.username = userName; // Replace with actual username
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
                    <input type="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password" placeholder="password"/>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="name" onChange={(e)=>{setName(e.target.value)}}/>
                    <label htmlFor="user_name">User name</label>
                    <input type="text" id="user_name" placeholder="user_name" onChange={(e)=>{setUserName(e.target.value)}}/>
                    <label htmlFor="nid">NID</label>
                    <input type="text" id="nid" placeholder="nid" onChange={(e)=>{setNID(e.target.value)}}/>
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