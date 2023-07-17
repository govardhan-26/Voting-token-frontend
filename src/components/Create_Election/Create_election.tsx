import React from 'react'
import Navbar from '../Navbar'
import './Create_election.css'

const Create_election = () => {
  return (
    <div className='elec-Container'>
        <Navbar />
        <div className= 'form-main-container'>
            <div className="form-container">
                <form action="">
                    <div>
                        <label >Election Name</label>  
                        <input type="text" name="electin_name" id="electin_name"/>
                    </div>
                    <div>
                        <label >Commission Head Name</label>  
                        <input type="text" name="head" id="head"/>
                    </div>    
                    <div>
                        <label >No of Voters</label>  
                        <input type="text" name="no_voters" id="no_voters"/>      
                    </div>
                    <div>    
                        <label >Who Can Vote</label>  
                        <input type="email"  className="who_vote" name="who_vote" id="who_vote"/>
                    </div>
                    <div>    
                        <label >Who Can Participate</label>  
                        <input type="email" className="who_can" name="who_can" id="who_can"/>
                    </div>    
                    <div className="submit-button">
                        <button >Create Election</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create_election