'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { itemNameReducerActions } from '@/Redux/itemNameReducer';

import '@/app/styles/App.css';
import { apiUrl } from '@/lib/Private';

const DealerSetPriceCard = ({ img, title }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const imageUrl = img?.startsWith('/') || img?.startsWith('http')
    ? img
    : `${apiUrl}/${img}`;

  const handleClick = () => {
    dispatch(
      itemNameReducerActions.add({
        for: 'priceItemName',
        name: title,
      })
    );
    router.push('/dealer/settings/setprice/editprice');
  };

  return (
    <button className="scrap__section__card" onClick={handleClick}>
      <div className="scrap__card__image">
        <Image
          src={imageUrl}
          alt={title || 'Scrap Item'}
          width={150}
          height={150}
          className="scrap__image"
        />
      </div>
      <p>{title}</p>
    </button>
  );
};

export default DealerSetPriceCard;
