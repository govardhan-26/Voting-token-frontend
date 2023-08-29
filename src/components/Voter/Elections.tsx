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
import { getDoc } from "firebase/firestore";
import { useElectioncreation } from "../Context";
import Axios from "axios";
interface UserData {
  user_id: string;
  name: string;
  email: string;
  nid: string;
  username: string;
  // Add other fields as needed
}

const Elections = () => {
  const dataref = collection(db, "Elections");
  
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const { token } = useElectioncreation();
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
    isVoted,
    setIsVoted,
  } = useElectioncreation();

  useEffect(() => {
    console.log("token============", token);
    const fetchUserInfo = async () => {
      try {
        const response = await Axios.get('https://dev.neucron.io/user/info', {
          headers: {
            Authorization: `${token}`, // Include access token in the authorization header
          },
        });

        const userData = response.data;
        console.log(userData.data.id);

        // Fetch Firestore document using the user ID
        const docRef = doc(db, 'users', userData.data.id);

        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          console.log(docData)
          setUserInfo(docData as UserData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token]);

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
        voterlist: arrayUnion({ NID, Name, isVoted }),
      });
  
      // Retrieve the election details from the election document
      const electionSnapshot = await getDoc(electionDoc);
      const electionData = electionSnapshot.data();
      const electionDetails = {
        electionId: electionId,
        ...electionData,
      };
  
      // Check if userInfo is not null before accessing user_id
      if (userInfo !== null) {
        // Add election details to the user document
        const userDoc = doc(db, "users", userInfo.user_id);
        await updateDoc(userDoc, {
          elections: arrayUnion(electionDetails),
        });
      }
  
      alert("Voter registration successful");
      console.log("Voter added to voterlist successfully");
    } catch (error) {
      console.error("Error adding voter to voterlist: ", error);
    }
  }
  
  async function addVoterToNomination(electionId: string) {
    try {
      const electionDoc = doc(db, "Elections", electionId);

      // Update the document's voterlist array by adding the new voter's NID
      await updateDoc(electionDoc, {
        candidatelist: arrayUnion({ NID, Name }),
      });
      alert("Nomination successfull");
      console.log("Voter added to candidatelist successfully");
    } catch (error) {
      console.error("Error adding voter to candidatelist: ", error);
    }
  }

  return (
    <div className="flex h-[100vh] w-[100vw]">
      <Navbar />
      <div className="h-[100%] w-[100%] ">
        <div className="m-[5%] flex-col overflow-y-scroll h-[90vh] overflow-x-hidden">
          <p className="font-bold ">Active Elections</p>
          <p className="text-[12px] text-[#AEAEAE]">Today:04:08:2023</p>
          {elections.map((election) => (
            <div
              key={election.id} // Use the ID as the key
              className="w-[100%] p-[2%] flex m-2"
            >
              <div className="flex gap-[4rem] w-[50%]">
                <div>
                <p className="font-bold">Election name: </p>
                <p className="mt-[1rem]"> {election.Election_Name}</p>
                </div>

                <div>
                <p className="font-bold">Election Head: </p>
                <p className="mt-[1rem]">{election.Commision_Head}</p>
                </div> 
              </div>
              <div className="gap-[2rem] flex mt-3 font-light ">
              <button
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded-[10rem] w-[120px] h-[30px]"
                  onClick={() => addVoterToNomination(election.id)}
                >
                  Nomination
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white  w-[120px] h-[30px] rounded-[10rem]"
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
