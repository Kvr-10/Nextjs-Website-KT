'use client';

import React from 'react';
import '@/app/styles/DealerRequestCategoryCard.css';

const DealerRequestCategoryCard = ({ img, name, description, status }) => {
  return (
    <div className="dealer__request__category__card">
      <img src={img} alt={name || 'Category'} />
      <h1>{name}</h1>
      <p>{description}</p>
      <span>{status}</span>
    </div>
  );
};

export default DealerRequestCategoryCard;
