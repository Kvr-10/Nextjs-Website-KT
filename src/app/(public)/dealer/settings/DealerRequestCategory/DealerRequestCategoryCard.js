'use client';

import React from 'react';
import '@/app/styles/DealerRequestCategoryCard.css';
import { apiUrl } from '@/lib/Private';

const DealerRequestCategoryCard = ({ img = '', name, description, status }) => {
  const imageUrl = img?.startsWith?.('/')
    ? img
    : `${apiUrl}/${img}`;

  return (
    <div className="dealer__request__category__card">
      <img src={imageUrl} alt={name || 'Category'} />
      <h1>{name}</h1>
      <p>{description}</p>
      <span>{status}</span>
    </div>
  );
};

export default DealerRequestCategoryCard;
