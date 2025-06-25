'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// css
import "@/app/styles/SellItemCard.css";

// api url
import { apiUrl } from "@/lib/Private";

const MarketPlaceCard = ({ dealer_id }) => {
  const router = useRouter();
  const [dealerData, setDealerData] = useState({});

  // get Dealer profile data
  useEffect(() => {
    axios.get(`${apiUrl}/v3/api/view-profile/dealer/${dealer_id}/`)
      .then((res) => {
        setDealerData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dealer data:", err);
      });
  }, [dealer_id]);

  const redirection = () => {
    if (dealerData.kt_id) {
      router.push(`/marketplace/${dealerData.kt_id}`);
    }
  };

  return (
    <div className="sell__item__card">
      <img src={`${apiUrl}/${dealerData.ProfilePic}`} alt="Dealer" />
      <div className="description">
        <h1>{dealerData.username}</h1>
        <p>Dealer Type : <span>{dealerData.account_type}</span></p>
        <p>Mobile Number : <span>{dealerData.mobile_number}</span></p>
        <button onClick={redirection}>View Prices</button>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
