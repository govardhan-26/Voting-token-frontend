import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Results.css'
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
            Candidate_name: "Shubh",
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
    <div className='Results-Container'>
        <Navbar/>
        <div className='Candidate-Container'>
            <div className='Contain'>
                {candidates.map((candidate, Candidate_id) => (
                    <div className='candidate'>
                        <div className='id'>{candidate.Candidate_id}</div>
                        <div className='name'>{candidate.Candidate_name}</div>
                        <div className='key'>{candidate.public_key}</div>
                        <div className='votes'>{candidate.votes}</div>
                    </div>
                ))}
            </div>
            <button onClick={updateVotes}>Count Votes</button>
        </div>
    </div>
  )
}

export default Results