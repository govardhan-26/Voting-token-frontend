import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import './Create_election.css'
import { PubKey, SensiletSigner, bsv, toByteString, toHex } from 'scrypt-ts';
import { useElectioncreation } from '../Context';

const Create_election = () => {
    const {isConnected,  ElectionName, setElectionName, HeadName, setHeadName, totalSupply, setTotalSupply, CanVote, setCanVote, CanParticipate, setCanParticipate} = useElectioncreation();

    useEffect(() => {
        console.log(isConnected);
    }, )
  

    const {handleSubmit} = useElectioncreation();

  return (
    <div className='elec-Container'>
        <Navbar />
        <div className= 'form-main-container'>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <div>
                        <label >Election Name</label>  
                        <input type="text" name="electin_name" id="electin_name" value={ElectionName} onChange={(e) =>setElectionName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="head">Commission Head Name</label>
                        <input type="text" name="head" id="head" value={HeadName}  onChange={(e) =>setHeadName(e.target.value)}/>
                    </div>

                    <div>
                        <label >No of Voters</label>  
                        <input type="text" name="no_voters" id="no_voters" value={totalSupply} onChange={(e) =>setTotalSupply(e.target.value)}/>      
                    </div>
                    <div>    
                        <label >Who Can Vote</label>  
                        <input type="email"  className="who_vote" name="who_vote" id="who_vote"  value={CanVote} onChange={(e) =>setCanVote(e.target.value)}/>
                    </div>
                    <div>    
                        <label >Who Can Participate</label>  
                        <input type="email" className="who_can" name="who_can" id="who_can" value={CanParticipate} onChange={(e) =>setCanParticipate(e.target.value)}/>
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