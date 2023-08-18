import React, { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { useElectioncreation } from "../../Context";
import Navbar from "../Navbar";
import "./Voter_list.css";

const VoterList = () => {
  const { id, setid } = useElectioncreation();
  const electionsRef = collection(db, "Elections");

  const [voterLists, setVoterLists] = useState<string[]>([]);

  const { handleTransfer, setmyAddress } = useElectioncreation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          query(electionsRef, where("Election_id", "==", id))
        );

        const voterListsData: string[] = [];
        querySnapshot.forEach((doc) => {
          const voterList = doc.data().voterlist || [];
          voterListsData.push(...voterList); // Spread the voterlist array into the main array
        });

        setVoterLists(voterListsData);
        console.log("voterlist", voterListsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
