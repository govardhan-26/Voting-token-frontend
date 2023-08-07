import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useElectioncreation } from "../../Context";

const VoterList = () => {
  const { id } = useElectioncreation();
  const votersRef = collection(db, "Voters");
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const q = query(votersRef, where("Election_id", "==", id));
        const querySnapshot = await getDocs(q);
        const voterData = querySnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };

    fetchVoters();
  }, [id]);

  return <></>;
};

export default VoterList;
