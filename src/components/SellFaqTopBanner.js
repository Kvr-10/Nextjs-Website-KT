'use client';

import React from 'react';

// CSS (Next.js compatible path)
import '@/app/styles/App.css';

const SellFaqTopBanner = ({ title }) => {
  return (
    <div className="sell__faq__top__banner">
      <h1>{title}</h1>
    </div>
  );
};

export default SellFaqTopBanner;
