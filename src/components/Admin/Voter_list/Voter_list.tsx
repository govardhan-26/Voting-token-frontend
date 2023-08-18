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
          <div className="m-[4%] flex-col">
            {voterLists.map((voter, voterid) => (
              <div
                key={voterid}
                className="w-[100%] p-[2%] flex m-2 border border-t border-2 border-black "
              >
                <div className="grid grid-cols-2 gap-4 w-[70%]">
                  <p>Voter NID: {voter["NID"]}</p>
                  <p>Voter Name: {voter["Name"]}</p>
                  <p>Voter public key: {voter["UserPublicKey"]}</p>
                  <p>Voter Name: {voter["Name"]}</p>
                </div>
                <div className="flex flex-row-reverse justify-between w-[50%] ">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-[75%]">
                      Transfer token{" "}
                    </button>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default VoterList;
