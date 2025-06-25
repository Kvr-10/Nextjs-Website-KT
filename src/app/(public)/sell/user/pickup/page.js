'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import Navbar from '@/components/Navbar';
import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';
import UserPickupCard from '@/components/User/UserPickupCard';
import MainFooter from '@/components/Footer/MainFooter';
import TermFooter from '@/components/Footer/TermFooter';

// Styles
import '@/app/styles/UserDealerPickup.css';
import '@/app/styles/App.css';

// API URL
import { apiUrl } from '@/lib/Private';

const UserPickup = () => {
  const [pickupData, setPickupData] = useState([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch pickup data
  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));
    if (!apiKey?.id) return;

    axios
      .get(`${apiUrl}/api/customer/confirm_orders/${apiKey.id}/`)
      .then((res) => {
        setPickupData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching pickup data:', err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <UserProfileSearchbar />
      <UserProfileNavbar />

      <div className="user__dealer__pickup__section similar__section">
        <h1 className="similar__section__heading">Your Pickup</h1>
        <div className="user__dealer__pickup">
          {pickupData.length > 0 ? (
            pickupData.map((eachData) => (
              <UserPickupCard
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

      <MainFooter />
      <TermFooter />
    </>
  );
};

export default UserPickup;
