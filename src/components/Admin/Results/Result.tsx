import React, { useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'

const Results = () => {
    const [candidates, setCandidates]  = useState([
        {
            Candidate_id: 1,
            Candidate_name: "Shubham Goutham",
            public_key : "0221f4b6b742555d4cdead5aef0b8796f7427005a821a7c27ca1501f8f92e44a36",
            votes : 0
        },
        {
            Candidate_id: 2,
            Candidate_name: "Shubham",
            public_key : "0221f4b6b742555d4cdead5aef0b8796f7427005a821a7c27ca1501f8f92e44a36",
            votes : 0
        },
        {
            Candidate_id: 3,
            Candidate_name: "Goutham",
            public_key : "0221f4b6b742555d4cdead5aef0b8796f7427005a821a7c27ca1501f8f92e44a36",
            votes : 0
        },
        {
            Candidate_id: 4,
            Candidate_name: "Goutham Shubham",
            public_key : "0221f4b6b742555d4cdead5aef0b8796f7427005a821a7c27ca1501f8f92e44a36",
            votes : 0
        }
    ])

    const updateVotes = () => {
        const baseURL = "https://api.whatsonchain.com/v1/bsv/test/script/";
      
        Promise.all(
          candidates.map(async (candidate) => {
            const url = baseURL + candidate.public_key + "/history";
      
            return axios.get(url)
              .then(response => {
                return { ...candidate, votes: response.data.length };
                console.log("api called");
              })
              .catch(error => {
                console.error("Error fetching data for candidate:", candidate.public_key, error);
                return candidate; 
              });
          })
        ).then(updatedCandidates => {
          setCandidates(updatedCandidates);
        });
      };


    // const updateVotes = () => {
    //     setCandidates((prev) =>
    //       prev.map((candidate) => ({ ...candidate, votes: 100 }))
    //     );
    //   };
      
      
    
  return (
    <div className='flex w-[100vw] h-[100vh] '>
        <Navbar/>
        <div className='h-[100%] w-[100%]'>
            <div className=' m-[5%] flex-col '>
              <h1 className='font-bold'>Results</h1>
              <p className="text-[12px] text-[#AEAEAE]">Today:04:08:2023</p>
                {candidates.map((candidate, Candidate_id) => (
                    <div className='flex gap-[4rem] m-[3rem] w-[50%]'>
                      <div>
                        <p className='font-bold'>ID</p>
                        <p className='mt-[1rem]'>{candidate.Candidate_id}</p>
                      </div>

                      <div>
                        <p className='font-bold'> Name</p>
                        <p className='mt-[1rem]'>{candidate.Candidate_name}</p>
                      </div>

                      <div className=''>
                        <p className='font-bold'>Public Key</p>
                        <p className='mt-[1rem]'>{candidate.public_key}</p>
                      </div>

                      <div className='flex flex-col items-center [4rem]'>
                        <p className='font-bold'>Votes</p>
                        <p className='mt-[1rem]'>{candidate.votes}</p>
                      </div>
                    </div>
                ))}

                <div className=" bg-blue-500 relative  hover:bg-blue-700 text-white mx-auto rounded-[10rem] w-[120px] h-[40px]">
                <button className='text-center flex mx-auto absolute top-[7px] left-[14px]' onClick={updateVotes}>Count Votes</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Results