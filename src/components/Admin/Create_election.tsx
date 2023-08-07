import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { addDoc } from "firebase/firestore";
import { collection,doc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
// import './Create_election.css'

import { PubKey, SensiletSigner, bsv, toByteString, toHex } from "scrypt-ts";
import { useElectioncreation } from "../Context";

const Create_election = () => {
  const {
    isConnected,
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

  // useEffect(() => {
  //     console.log(isConnected);
  //     console.log("The Election name is - ",ElectionName);
  //     console.log("The HeadName is - ",HeadName);
  // }, )

  async function submitbase() {
    const docRef = await addDoc(collection(db, "Elections"), {
        Election_Name:ElectionName,
        Commision_Head: HeadName,
        No_of_voters : totalSupply,
        voterlist : [],
        candidatelist:[]
    });
    console.log("Document written with ID: ", docRef.id);
    const electionDoc = doc(db, "Elections", docRef.id);

  // Update the document to add a new attribute
  await updateDoc(electionDoc, {
    Election_id:docRef.id,
  });

  }

  const handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitbase();
    handleSubmit();
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="w-full h-full flex flex-col ">
        <div className="p-[1%] m-[1%] h-full">
          <form onSubmit={handleSubmit1} className="flex flex-col  h-full">
            <div className="flex m-[2%]">
              <label className="flex justify-start w-[50%]">
                Election Name
              </label>
              <input
                type="text"
                className="border border-black w-[50%] rounded-[5px] bg-[#EDEBEB] h-[3rem]"
                name="electin_name"
                id="electin_name"
                value={ElectionName}
                onChange={(e) => setElectionName(e.target.value)}
              />
            </div>
            <br />
            <div className="flex m-[2%]">
              <label className="flex justify-start w-[50%]" htmlFor="head">
                Commission Head Name
              </label>
              <input
                type="text"
                className="border border-black w-[50%] rounded-[5px] bg-[#EDEBEB] h-[3rem]"
                name="head"
                id="head"
                value={HeadName}
                onChange={(e) => setHeadName(e.target.value)}
              />
            </div>

            <div className="flex m-[2%]">
              <label className="flex justify-start w-[50%]">No of Voters</label>
              <input
                type="text"
                className="border border-black w-[50%] rounded-[5px] bg-[#EDEBEB] h-[3rem]"
                name="no_voters"
                id="no_voters"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
              />
            </div>

            <div className="flex m-[2%]">
              <label className="flex justify-start w-[50%]">Aadhar Card</label>
              <input
                type="text"
                className="border border-black w-[50%] rounded-[5px] bg-[#EDEBEB] h-[3rem]"
                name="aadhar_card"
                id="aadhar_card"
                value={AadharCard}
                onChange={(e) => setAadharCard(e.target.value)}
              ></input>
            </div>

            <div className="submit-button m-[2%]">
              <button className="flex flex-row-reverse border border-black bg-[#140026] text-[#E8E8E8] rounded-[10px] p-[1rem]">
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
