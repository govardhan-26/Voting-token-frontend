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
import "./Voter_list.css";

const VoterList = () => {
  const { Election_id } = useParams();

  const [voterLists, setVoterLists] = useState<string[]>([]);

  const { handleTransfer, setmyAddress } = useElectioncreation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch election details based on the Election_id
        const electionDoc = doc(collection(db, "Elections"), Election_id);
        const electionSnapshot = await getDoc(electionDoc);

        if (electionSnapshot.exists()) {
          const electionData = electionSnapshot.data();
          const voterList = electionData?.voterlist || [];
          setVoterLists(voterList);
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
          {voterLists.map((voter, voterid) => (
            <div
              key={voterid}
              className="w-[100%] p-[2%] flex m-2 "
            >
              <div className="flex gap-[4rem] w-full ">
                <div className="w-full">
                  <p className="font-bold">Voter NID:</p>
                  <p className="mt-[1rem]">{voter["NID"]}</p>
                </div>

                <div className="w-full">
                  <p className="font-bold">Voter Name:</p>
                  <p className="mt-[1rem]">{voter["Name"]}</p>
                </div>
                

                {/* <p>Election Head: {voter.Commision_Head}</p> */}
                <div className="flex justify-end w-full">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-[10rem] w-[140px] h-[40px]" >
                    Transfer token{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoterList;
