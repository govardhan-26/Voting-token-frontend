import React, { useState } from 'react'
import './Admin_register.css'
import login_admin from '../../assets/admin_login.svg'
import voter_admin from '../../assets//voter_login.svg'
import neucron from '../../assets/neucron.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Admin_register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const Register = (e : any) => {
        e.preventDefault();
        axios.post('https://api.neucron.io/auth/signup', {
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
        <div className="main-container">
            <div className="container">
                <div className='heading'>
                    <h1>Admin Register</h1>
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
                    <button className="login-button">Register</button>
                    <p className="no-acnt">Already Had an Account ? <a href="/admin_login">Login</a></p>
                    {/* <div className="neucron">
                        <p className="neucron-button">Register Using Neucron </p>
                        <img src={neucron} alt="Neucron"/>
                    </div> */}
                </form> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin_register