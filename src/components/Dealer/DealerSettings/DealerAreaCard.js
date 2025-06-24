"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import "@/app/styles/DealerAreaCard.css";

const DealerAreaCard = ({ pincode, deleteArea }) => {
  const [areaInputData, setAreaInputData] = useState({
    state: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const postOffice = response.data[0]?.PostOffice?.[0];
        if (postOffice) {
          setAreaInputData({
            state: postOffice.State || "",
            city: postOffice.District || "",
            area: postOffice.Block || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch area info:", error);
      }
    };
    fetchAreaData();
  }, [pincode]);

  return (
    <div className="dealer__area__card">
      <h1>{pincode}</h1>
      <p>
        State : <span>{areaInputData.state}</span>
      </p>
      <p>
        City : <span>{areaInputData.city}</span>
      </p>
      <p>
        Area : <span>{areaInputData.area}</span>
      </p>
      <button onClick={deleteArea}>Delete Area</button>
    </div>
  );
};

export default DealerAreaCard;
