import React from 'react'
import Navbar from '../Navbar'
import './Voter_list.css'
import { useElectioncreation } from '../../Context'; 


const Voter_list = () => {
    const {handleTransfer, setmyAddress} = useElectioncreation();


  return (
    <div className='flex h-screen w-screen'> 
        <Navbar/>
        <div className='h-full w-full flex justify-center items-center'>
            <div className="Voter-list-tokenform">
                <form onSubmit={handleTransfer} className='transfer-form'>
                    <label htmlFor="Public key">Enter the Publick Key</label>
                    <input type="text" placeholder='Enter Public Key' onChange={(e) => {setmyAddress(e.target.value)}}/>
                    <button type='submit'>Transfer</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Voter_list