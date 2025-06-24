'use client';

import Image from 'next/image';
import '@/app/styles/UserDealerWalletHistory.css';

const WalletHistoryCard = ({ paymentTypeImg, transactionId, transferTo, mobileNo, amount, date }) => (
  <div className="user__dealer__wallet__history__card">
    <Image src={paymentTypeImg} alt="Payment Type" width={40} height={40} />
    <div>
      <p>Transaction ID: {transactionId}</p>
      <p>Transferred to: {transferTo} ({mobileNo})</p>
      <p>Amount: ₹{amount}</p>
      <p>Date: {date}</p>
    </div>
  </div>
);

export default WalletHistoryCard;
