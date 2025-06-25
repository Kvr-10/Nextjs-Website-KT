'use client';

import React, { useState, useEffect } from 'react';

// Components
import UserProfileSearchbar from '@/components/UserProfileSearchbar';
import UserProfileNavbar from '@/components/User/UserProfileNavbar';
import UserDealerWalletHistoryCard from '@/components/UserDealerSimilarComponent/UserDealerWalletHistoryCard';

// Styles
import '@/app/styles/UserDealerWalletHistory.css';
import '@/app/styles/App.css';

// ✅ Sample mock data (replace with real API data as needed)
const mockWalletHistoryData = [
  {
    paymentTypeImg: '/Image/gpay.png',
    transactionId: 'TXN123456',
    transferTo: 'Google Pay',
    mobileNo: '9876543210',
    amount: '₹200',
    date: '2025-06-25',
  },
  {
    paymentTypeImg: '/Image/paytm.png',
    transactionId: 'TXN654321',
    transferTo: 'Paytm',
    mobileNo: '9123456789',
    amount: '₹150',
    date: '2025-06-24',
  },
];

const UserWalletHistory = () => {
  const [walletHistoryData, setWalletHistoryData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulating data fetch
    setWalletHistoryData(mockWalletHistoryData);
  }, []);

  return (
    <>
      <UserProfileSearchbar />
      <UserProfileNavbar />

      <div className="user__dealer__wallet__history similar__section">
        <h1 className="similar__section__heading">Your Wallet History</h1>
        {walletHistoryData.length > 0 ? (
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
