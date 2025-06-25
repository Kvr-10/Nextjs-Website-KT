'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { apiUrl } from '@/lib/Private';
import '@/app/styles/App.css';

const DealerSetPriceCard = ({ img, title }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const image_url = `${apiUrl}${img}`;

  const handleClick = () => {
    dispatch(itemNameActions.add({ for: 'priceItemName', name: title }));
    router.push('/dealer/settings/setprice/editprice');
  };

  return (
    <button className="scrap__section__card" onClick={handleClick}>
      <img src={image_url} alt={title} />
      <p>{title}</p>
    </button>
  );
};

export default DealerSetPriceCard;
