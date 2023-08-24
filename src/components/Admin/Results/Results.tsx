import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { DocumentData, QuerySnapshot, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import { useElectioncreation } from "../../Context";
const Results = () => {

  const { id, setid } = useElectioncreation();
  const dataref = collection(db, "Elections");
  const [elections, setElections] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          dataref
        );
        const data: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setElections(data);
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
          <p className="font-bold ">Active Elections</p>
          <p className="text-[12px] text-[#AEAEAE]">Today:04:08:2023</p>
          {elections.map((election, electionid) => (
            <div
              key={electionid}
              className="w-[100%] p-[2%] flex m-2 "
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
              <Link to={'/admin_dashboard/elections/'+ election.Election_id + '/Result/'}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-[10rem] w-[120px] h-[30px]"
                    onClick={() => {
                      // console.log(election.voterlist);
                      setid(election.Election_id);
                    }}
                  >
                    See Results
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;



