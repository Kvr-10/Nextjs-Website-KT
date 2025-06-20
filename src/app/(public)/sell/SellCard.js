'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// CSS
import '@/app/styles/App.css';

// API
import { apiUrl } from '@/lib/Private';

const SellCard = ({ pic, title }) => {
  const router = useRouter();

  // Safe access to localStorage
  const pincode = typeof window !== 'undefined' ? localStorage.getItem('KTMpincode') : null;

  const handleClick = () => {
    if (pincode !== null) {
      localStorage.setItem('KTMsellItemName', title.toLowerCase());
      router.push('/sell/sellitem');
    } else {
      Swal.fire({
        title: 'Enter Pincode',
        confirmButtonColor: '#56b124',
      });
    }
  };

  const imageUrl = `${apiUrl}${pic}`;

  return (
    <button className="scrap__section__card" onClick={handleClick}>
      <img src={imageUrl} alt={title} />
      <p>{title[0].toUpperCase() + title.slice(1).toLowerCase()}</p>
    </button>
  );
};

export default SellCard;
