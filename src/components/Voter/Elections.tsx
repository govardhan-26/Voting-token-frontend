import React, { useEffect, useState } from "react";
import Navbar from "./Voter_navbar";
import {
  DocumentData,
  QuerySnapshot,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useElectioncreation } from "../Context";

const Elections = () => {
  const dataref = collection(db, "Elections");
  const [elections, setElections] = useState<DocumentData[]>([]);
  const {
    sensiletLogin,
    isConnected,
    Username,
    setUsername,
    NID,
    setNID,
    Email,
    setEmail,
    Name,
    setName,
  } = useElectioncreation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          dataref
        );
        const data: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() }); // Include the ID
        });
        setElections(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function addVoterToVoterlist(electionId: string) {
    try {
      const electionDoc = doc(db, "Elections", electionId);

      // Update the document's voterlist array by adding the new voter's NID
      await updateDoc(electionDoc, {
        voterlist: arrayUnion({ NID, Name }),
      });

      console.log("Voter added to voterlist successfully");
    } catch (error) {
      console.error("Error adding voter to voterlist: ", error);
    }
  }

  return (
    <div className="flex h-[100vh] w-[100vw]">
      <Navbar />
      <div className="h-[100%] w-[100%] ">
        <div className="m-[5%] flex-col">
          {elections.map((election) => (
            <div
              key={election.id} // Use the ID as the key
              className="w-[100%] p-[2%] flex m-2 border border-t border-2 border-black "
            >
              <div className="flex flex-col w-[50%]">
                <p>Election name: {election.Election_Name}</p>
                <p>Election Head: {election.Commision_Head}</p>
              </div>
              <div className="flex flex-row-reverse justify-between w-[100%] ">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addVoterToVoterlist(election.id)}
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Elections;
