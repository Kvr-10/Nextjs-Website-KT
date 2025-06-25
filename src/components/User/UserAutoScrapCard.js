'use client';

import React from 'react';

// Styles
import '@/app/styles/App.css';

// API
import { apiUrl } from '@/lib/Private';

const UserAutoScrapCard = ({ img, title, autoScrapService }) => {
  const url = `${apiUrl}${img}`;

  return (
    <button className="scrap__section__card" onClick={autoScrapService}>
      <img src={url} alt={title || 'Scrap Item'} />
      <p>{title[0].toUpperCase() + title.slice(1)}</p>
    </button>
  );
};

export default UserAutoScrapCard;
