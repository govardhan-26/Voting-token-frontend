import React, { useState } from 'react'
import './Admin_register.css'
import login_admin from '../../assets/admin_login.svg'
import voter_admin from '../../assets//voter_login.svg'
import neucron from '../../assets/neucron.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import app_logo from "../../assets/app_logo.png"


const Voter_register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const Register = (e : any) => {
        e.preventDefault();
        Axios.post('https://api.neucron.io/auth/signup', {
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
            Navigate('/voter_dashboard');
    })
    }
    return (
        <div>
            <div>
            <div className="relative bg-white bg-cover m-0 h-[100vh] w-[100vw] flex flex-col items-center justify-center">
                <img className='w-[130px] absolute top-4 left-4' src={app_logo}/>
                <div className="relative flex flex-col h-[90%] w-[35%] ">
                    <div className='w-full h-[10%] text-center'>      
                        <h1 className='absolute top-[80px] text-[20px] left-[10rem] font-light font-serif '>Voter Register</h1>
                    </div>
                    <div className="h-[25%] w-full flex flex-row justify-evenly items-center relative">
                        <div className="m-[10px] rounded-[50%] flex items-center justify-center absolute top-[4rem] w-[130px] left-[40px]">
                            <Link to='/voter_register' className=' w-[100px] rounded-full hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'><img src={voter_admin} alt="Voter"/></Link>
                        </div>
                        <div className="m-[10px] rounded-[50%] flex items-center justify-center absolute top-[4rem] w-[130px] right-[100px]">
                            <Link to='/admin_register' className='w-[100px] rounded-full hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'><img src={login_admin} alt="Admin"/></Link>
                        </div>
                    </div>
                    <div className='relative top-[33px] text-[15px] font-light p-8 h-full'>
                    <form action="" className="flex flex-col justify-between m-[2rem] mt-0 font-serif" onSubmit={Register}>
                        <label className='pb-[10px]' htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" className='p-2 border rounded-md w-[20rem] font-[18px]' onChange={(e)=>{setEmail(e.target.value)}}/>
                        <label htmlFor="password" className='m-2 ml-0'>Password</label>
                        <input type="password" id="password" placeholder="Password" className='p-2 border rounded-md w-[20rem]' onChange={(e)=>{setPassword(e.target.value)}}/>
                        <label htmlFor="password" className='m-2 ml-0'>Confirm Password</label>
                        <input type="password" id="password" className='p-2 border rounded-md w-[20rem]' placeholder="password"/>
                        <button className="w-[85%] p-3 m-8 pl-0 ml-0 rounded-[10rem] text-white bg-[#6268EA] ">Register</button>
                        <p className='text-[13px] absolute left-[9rem] top-[22rem] gap-2 mt-3 mx-auto  '>Already Had an Account ?  <a href='/admin_login' className='underline text-[#6268EA]'>Login</a></p>
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