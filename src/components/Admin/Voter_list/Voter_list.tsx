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
          {voterLists.map((voter, voterid) => (
            <div
              key={voterid}
              className="w-[100%] p-[2%] flex m-2 border border-t border-2 border-black "
            >
              <div className="flex w-[50%]">
                <p>Voter NID: {voter["NID"]}</p>
                <p>Voter Name: {voter["Name"]}</p>
                {/* <p>Election Head: {voter.Commision_Head}</p> */}
                <div className="flex flex-row justify-between w-[100%] ">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Candidate List{" "}
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
