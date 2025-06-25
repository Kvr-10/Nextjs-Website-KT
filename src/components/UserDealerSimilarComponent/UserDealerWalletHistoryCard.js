'use client';

import React from 'react';

// CSS
import '@/app/styles/UserDealerWalletHistoryCard.css';

const UserDealerWalletHistoryCard = ({
  paymentTypeImg,
  transactionId,
  transferTo,
  mobileNo,
  amount,
  date,
}) => {
  return (
    <div className="user__dealer__wallet__history__card">
      <div className="left__side">
        <img src={paymentTypeImg} alt="Payment method" />
      </div>
      <div className="right__side">
        <p>
          Transaction ID : <span>{transactionId}</span>
        </p>
        <p>
          Transfer to : <span>{transferTo}</span>
        </p>
        <p>
          Mobile No : <span>{mobileNo}</span>
        </p>
        <p>
          Amount : <span>{amount}</span>
        </p>
        <p>
          Date : <span>{date}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDealerWalletHistoryCard;
