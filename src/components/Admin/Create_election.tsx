import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { addDoc } from "firebase/firestore";
import { collection,doc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Axios from "axios";
import { getDoc } from "firebase/firestore";
import { useElectioncreation } from "../Context";
// import './Create_election.css'
interface UserData {
  user_id: string;
  name: string;
  email: string;
  nid: string;
  username: string;
  wallet_address:string;
  pub_key:string;  // Add other fields as needed
}



const Create_election = () => {
  const {
    ElectionName,
    setElectionName,
    HeadName,
    setHeadName,
    totalSupply,
    setTotalSupply,
    AadharCard,
    setAadharCard,
    handleSubmit,
  } = useElectioncreation();
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const {myAddress} = useElectioncreation();
  const { token } = useElectioncreation();
  const myPubkey = useElectioncreation();

  // useEffect(() => {
  //     console.log(isConnected);
  //     console.log("The Election name is - ",ElectionName);
  //     console.log("The HeadName is - ",HeadName);
  // }, )

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

  const performAnotherFunction = async () => {
    try {
      // Code for the additional function
      console.log(myPubkey.myPubkey);
  
      // Add myPubkey.myPubkey to the user document
      if (userInfo !== null) {
        const userDoc = doc(db, 'users', userInfo.user_id);
        await updateDoc(userDoc, {
          sens_pub_key: myPubkey.myPubkey,
        });
        console.log('myPubkey added to user document successfully');
      }
    } catch (error) {
      console.error('Error adding myPubkey to user document:', error);
    }
  };

  async function submitbase() {
    const docRef = await addDoc(collection(db, "Elections"), {
      Election_Name: ElectionName,
      Commision_Head: HeadName,
      No_of_voters: totalSupply,
      voterlist: [], // Initialize voterlist as an empty array
      candidatelist: [] // Initialize candidatelist as an empty array
    });
  
    console.log("Document written with ID: ", docRef.id);
  
    const electionDoc = doc(db, "Elections", docRef.id);
  
    // Update the document to add a new attribute
    await updateDoc(electionDoc, {
      Election_id: docRef.id,
    });
  
    try {
      // Code for the additional function
      console.log(myPubkey.myPubkey);
  
      // Add docRef.id to the user's election_created array
      if (userInfo !== null) {
        const userDoc = doc(db, 'users', userInfo.user_id);
        const userSnap = await getDoc(userDoc);
  
        if (userSnap.exists()) {
          const userData = userSnap.data();
  
          if (userData?.election_created) {
            userData.election_created.push(docRef.id); // Add the new election ID
          } else {
            userData.election_created = [docRef.id]; // Create an array if it doesn't exist
          }
  
          await updateDoc(userDoc, {
            election_created: userData.election_created,
          });
  
          console.log('Election ID added to user document successfully');
        } else {
          console.log('User document does not exist');
        }
      }
    } catch (error) {
      console.error('Error adding Election ID to user document:', error);
    }
  }
  
  

  const handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitbase();
    handleSubmit();
  };

  return (
    <div className="flex w-full h-full">
      <Navbar />
      <div className="w-full h-full relative ">
        <div className="absolute left-[25rem] top-[3.7rem] h-full flex items-center">
          <form onSubmit={handleSubmit1} className="flex flex-col h-full w-[18rem]">
            <div className="flex flex-col m-1 gap-0 ">
              <label className="flex justify-start w-full m-2 ml-0 ">
                Election Name
              </label>
              <input
                type="text"
                className="border border-black p-2 rounded-[5px] bg-[#EEEEEE] h-[3rem]"
                name="electin_name"
                id="electin_name"
                value={ElectionName}
                onChange={(e) => setElectionName(e.target.value)}
              />
            </div>
            <br />
            <div className="relative top-[-1rem] flex flex-col m-1 gap-0 ">
              <label className="w-full m-2 ml-0" htmlFor="head">
                Commission Head Name
              </label>
              <input
                type="text"
                className="border border-black w-full p-2 rounded-[5px] bg-[#EEEEEE]  h-[3rem]"
                name="head"
                id="head"
                value={HeadName}
                onChange={(e) => setHeadName(e.target.value)}
              />
            </div>

            <div className="flex flex-col m-1">
              <label className="flex justify-start m-2 ml-0 ">No of Voters</label>
              <input
                type="text"
                className="border border-black w-full p-2 rounded-[5px] bg-[#EEEEEE]  h-[3rem]"
                name="no_voters"
                id="no_voters"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
              />
            </div>

            <div className="flex flex-col m-1">
              <label className="flex justify-start w-full m-2 ml-0">Aadhar Card</label>
              <input
                type="text"
                className="border border-black w-full rounded-[5px] bg-[#EEEEEE]  h-[3rem]"
                name="aadhar_card"
                id="aadhar_card"
                value={AadharCard}
                onChange={(e) => setAadharCard(e.target.value)}
              ></input>
            </div>

            <div className="submit-button mt-4 flex flex-col relative ">
              <button className="flex ml-[3.5rem]  mt-[10px] w-[10rem] absolute pl-6 bg-[#6268EA] text-[#E8E8E8] rounded-[10rem] p-[10px]">
                Create Election
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_election;
