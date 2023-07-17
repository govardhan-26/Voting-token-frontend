import React from 'react'
import Navbar from '../Navbar'
import './Admin_dashboard.css'

const Admin_dashboard = () => {
  const Name = "Govardhan";
  const Email = "gova@gmail.com";
  const NID = "1234 2013 2548 2312";
  const Username = "govarhdan2136";

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
              <button>Connect</button>
          </div>   
        </div>
    </div>
  )
}

export default Admin_dashboard