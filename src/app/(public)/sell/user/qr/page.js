'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/lib/Private';

// Components
import Navbar from '@/components/Navbar';
import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';
import MainFooter from '@/components/Footer/MainFooter';
import TermFooter from '@/components/Footer/TermFooter';

// Styles
import '@/app/styles/UserDealerQR.css';
import '@/app/styles/App.css';

const UserQR = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const apiKey = JSON.parse(localStorage.getItem('KTMauth'));

    if (!apiKey || !apiKey.tokens?.refresh) return;

    const profileUrl = `${apiUrl}/v3/api/view-profile/customer/${apiKey.tokens.refresh}`;

    axios
      .get(profileUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `${apiKey.tokens.refresh}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <UserProfileSearchbar />
      <UserProfileNavbar />

      {userData && (
        <div className="user__dealer__qr__section similar__section">
          <h1 className="similar__section__heading">Your QR Code</h1>
          <div className="user__dealer__qr">
            <img src={`${apiUrl}${userData.qrCode}`} alt="QR Code" />
            <p>{userData.email}</p>
            <h1>{userData.mobile_number}</h1>
            <h1>{userData.account_type}</h1>
          </div>
        </div>
      )}

      <MainFooter />
      <TermFooter />
    </>
  );
};

export default UserQR;
