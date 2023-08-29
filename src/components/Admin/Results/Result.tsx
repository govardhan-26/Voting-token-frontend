import React, { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { useElectioncreation } from "../../Context";
import Navbar from "../Navbar";

const CandidateList = () => {
  
  const { Election_id } = useParams();

  const [candidateLists, setcandidateLists] = useState<string[]>([]);

  const { handleTransfer, setmyAddress } = useElectioncreation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch election details based on the Election_id
        const electionDoc = doc(collection(db, "Elections"), Election_id);
        const electionSnapshot = await getDoc(electionDoc);

        if (electionSnapshot.exists()) {
          const electionData = electionSnapshot.data();
          const candidatelist = electionData?.candidatelist || [];
          setcandidateLists(candidatelist);
          console.log(candidateLists);
        } else {
          console.log("Election not found");
        }
      } catch (error) {
        console.log(Election_id);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [Election_id]);


  return (
    <div className="flex h-[100vh] w-[100vw]">
    <Navbar />
    <div className="h-[100%] w-[100%] ">
      <div className="m-[5%] flex-col">
      <p className="text-[12px] text-[#AEAEAE]">Today:04:08:2023</p>
        {candidateLists.map((voter, voterid) => (
          <div
            key={voterid}
            className="w-[100%] p-[2%] flex m-2 "
          >
            <div className="flex gap-[4rem] w-full ">
              <div className="w-full">
                <p className="font-bold">Candidate NID:</p>
                <p className="mt-[1rem]">{voter["NID"]}</p>
              </div>

              <div className="w-full">
                <p className="font-bold">Candidate Name:</p>
                <p className="mt-[1rem]">{voter["Name"]}</p>
              </div>
              

              {/* <p>Election Head: {voter.Commision_Head}</p> */}
              <div className="w-full">
                <p className="font-bold">Votes</p>
                <p className="mt-[1rem]">0</p>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default CandidateList;
