'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

import { apiUrl } from '@/lib/Private';
import '@/app/styles/DealerPriceItemCard.css';
import '@/app/styles/DealerPriceCardInputPrices.css';

const DealerPriceCardInputPrices = ({ pincode, price, subcatid }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [priceValue, setPriceValue] = useState(price || '');
  const apiKey = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('KTMauth')) : null;

  useEffect(() => {
    if (isTouched) {
      console.log('Price value changed');
    }
  }, [isTouched]);

  const setPrice = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('subcategory', subcatid);
    data.append('dealer', apiKey?.id);
    data.append('pincode', pincode);
    data.append('price', priceValue);

    try {
      await axios.post(`${apiUrl}/dealer_details/add-price/`, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });

      Swal.fire({
        title: 'Successfully Edited',
        confirmButtonColor: '#56b124',
      });
    } catch (err) {
      console.error(err);
    }

    Swal.fire({
      title: 'The price has been set successfully',
      confirmButtonColor: '#56b124',
    });
  };

  const deletePrice = () => {
    const data = new FormData();
    data.append('subcategory', subcatid);
    data.append('dealer', apiKey?.id);
    data.append('pincode', pincode);

    axios
      .post(`${apiUrl}/dealer_details/delete-price/`, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(() => {
        Swal.fire({ title: 'Successfully removed' });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Failed to remove price',
          confirmButtonColor: 'red',
        });
      });
  };

  return (
    <form onSubmit={setPrice}>
      <div className="price__section">
        <h1>{pincode}</h1>
        <p>:</p>
        <input
          type="text"
          placeholder={price}
          value={priceValue}
          onChange={(e) => {
            setPriceValue(e.target.value);
            setIsTouched(true);
          }}
          name="price"
        />
        <DeleteIcon onClick={deletePrice} style={{ cursor: 'pointer' }} />
      </div>
    </form>
  );
};

export default DealerPriceCardInputPrices;
