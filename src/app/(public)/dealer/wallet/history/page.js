'use client';

import { useEffect, useState } from 'react';
import DealerProfileSearchbar from '@/components/DealerProfileSearchbar';
import DealerProfileNavbar from '@/components/DealerProfileNavbar';
import WalletHistoryCard from '@/components/wallet/WalletHistoryCard';

import { WalletHistoryData } from '@/data/WalletHistoryData';
import '@/app/styles/UserDealerWalletHistory.css';
import '@/app/styles/App.css';

const DealerWalletHistory = () => {
  const [walletHistoryData] = useState(WalletHistoryData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DealerProfileSearchbar />
      <DealerProfileNavbar />

      <div className="user__dealer__wallet__history similar__section">
        <h1 className="similar__section__heading">Your Wallet History</h1>
        {walletHistoryData.length !== 0 ? (
          walletHistoryData.map((each, index) => (
            <WalletHistoryCard key={index} {...each} />
          ))
        ) : (
          <p>No wallet history available here</p>
        )}
      </div>

    </>
  );
};

export default DealerWalletHistory;
