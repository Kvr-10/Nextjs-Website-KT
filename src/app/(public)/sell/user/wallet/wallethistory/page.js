'use client';

import React, { useState, useEffect } from 'react';

// Components

import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';

// Styles
import '@/app/styles/UserDealerWalletHistory.css';
import '@/app/styles/App.css';

// Data
import UserDealerWalletHistoryCard  from '@/components/UserDealerSimilarComponent/UserDealerWalletHistoryCard';

const UserWalletHistory = () => {
  const [walletHistoryData] = useState(WalletHistoryData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

      <UserProfileSearchbar />
      <UserProfileNavbar />

      <div className="user__dealer__wallet__history similar__section">
        <h1 className="similar__section__heading">Your Wallet History</h1>
        {walletHistoryData.length !== 0 ? (
          walletHistoryData.map((eachHistory, index) => (
            <UserDealerWalletHistoryCard
              key={index}
              paymentTypeImg={eachHistory.paymentTypeImg}
              transactionId={eachHistory.transactionId}
              transferTo={eachHistory.transferTo}
              mobileNo={eachHistory.mobileNo}
              amount={eachHistory.amount}
              date={eachHistory.date}
            />
          ))
        ) : (
          <p>No wallet history available here</p>
        )}
      </div>

    
    </>
  );
};

export default UserWalletHistory;
