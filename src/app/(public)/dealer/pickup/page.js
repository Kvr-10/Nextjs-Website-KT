'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerPickupCard from './DealerPickupCard';


import '@/app/styles/UserDealerPickup.css';
import '@/app/styles/App.css';

import { apiUrl1 } from '@/lib/Private';

const DealerPickupPage = () => {
  const [pickupData, setPickupData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));
    if (!apiKey?.id) return;

    axios
      .get(`${apiUrl1}/api/dealer/confirm_orders/${apiKey.id}/`)
      .then((res) => setPickupData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="user__dealer__pickup__section similar__section">
        <h1 className="similar__section__heading">Your Pickup</h1>
        <div className="user__dealer__pickup">
          {pickupData.length !== 0 ? (
            pickupData.map((eachData) => (
              <DealerPickupCard
                key={eachData.id}
                uniqueId={eachData.id}
                total_cart_items={eachData.total_cart_items}
                date={eachData.created_at}
                total_amount={eachData.total_amount}
                status={eachData.status}
                order_no={eachData.order_number}
              />
            ))
          ) : (
            <p>No pickup data available here</p>
          )}
        </div>
      </div>

    </>
  );
};

export default DealerPickupPage;
