'use client';

import React from 'react';
import '@/app/styles/DealerHomeCard.css'; // Adjust path as needed (e.g., move CSS to styles folder)

const DealerHomeCard = ({ title, number }) => {
  return (
    <div className="dealer__home__card">
      <h1>{title}</h1>
      <p>{number}</p>
    </div>
  );
};

export default DealerHomeCard;
