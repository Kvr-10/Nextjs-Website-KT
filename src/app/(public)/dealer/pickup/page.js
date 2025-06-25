'use client';

import { useEffect, useState } from 'react';
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import DealerPickupCard from './DealerPickupCard';

import { PickupData } from '@/data/PickupData';

import '@/app/styles/UserDealerPickup.css';
import '@/app/styles/App.css';

const DealerPickupPage = () => {
  const [pickupData, setPickupData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // You can fetch from API here if needed, fallback to static
    setPickupData(PickupData);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="user__dealer__pickup__section similar__section">
        <h1 className="similar__section__heading">Your Pickups</h1>
        <div className="user__dealer__pickup">
          {pickupData.length > 0 ? (
            pickupData.map((each, index) => (
              <DealerPickupCard key={index} {...each} />
            ))
          ) : (
            <p>No pickup data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DealerPickupPage;
