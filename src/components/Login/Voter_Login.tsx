import React, { useState } from 'react'
import './Admin_Login.css'
import login_admin from '../../assets/admin_login.svg'
import voter_admin from '../../assets//voter_login.svg'
import neucron from '../../assets/neucron.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'


const Voter_register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const Register = (e : any) => {
        e.preventDefault();
        Axios.post('https://api.neucron.io/auth/login', {
            "email": email,
            "password": password
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })
        .then((response)=>{
            console.log(response);
            Navigate('/admin_dashboard');
    })
    }
  return (
    <div>
        <div>
        <div className="main-container">
            <div className="container">
                <div className='heading'>
                    <h1>Voter Login</h1>
                </div>
                <div className="selection-container">
                    <div className="selection">
                        <Link to='/voter_login' className='selection-voter'><img src={voter_admin} alt="Voter"/></Link>
                    </div>
                    <div className="selection">
                        <Link to='/admin_login' className='selection-admin'><img src={login_admin} alt="Admin"/></Link>
                    </div>
                </div>
                <div className='register-form'>
                <form action="" className="login-form" onSubmit={Register}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className="login-button">Login</button>
                    <p className="no-acnt">No Account ? <a href="/voter_register">Register</a></p>
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


