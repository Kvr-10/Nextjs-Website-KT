'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';


import '@/app/styles/UserDealerQR.css';
import '@/app/styles/App.css';

import { apiUrl } from '@/lib/Private';

const DealerQR = () => {
  const [dealerData, setDealerData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));

    if (!apiKey || !apiKey.tokens?.refresh) return;

    const profileUrl = `${apiUrl}/v3/api/view-profile/dealer/${apiKey.tokens.refresh}`;

    axios
      .get(profileUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `${apiKey.tokens.refresh}`,
        },
      })
      .then((response) => {
        setDealerData(response.data);
      })
      .catch((err) => {
        console.error('Error fetching dealer profile:', err);
      });
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      {dealerData && (
        <div className="user__dealer__qr__section similar__section">
          <h1 className="similar__section__heading">Your QR Code</h1>
          <div className="user__dealer__qr">
            <img src={`${apiUrl}/${dealerData.qrCode}`} alt="QR Code" />
            <h1>{dealerData.email}</h1>
            <h1>{dealerData.username}</h1>
            <h1>{dealerData.account_type}</h1>
          </div>
        </div>
      )}

    </>
  );
};

export default DealerQR;
