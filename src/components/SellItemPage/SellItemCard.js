'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { cartReducerActions } from '@/Redux/cartReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import '@/app/styles/SellItemCard.css';

// API
import { apiUrl } from '@/lib/Private';

const SellItemCard = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);

  // Avoid SSR issue with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = localStorage.getItem('KTMauth');
      setApiKey(JSON.parse(key));
    }
  }, []);

  const addToCart = () => {
    if (apiKey) {
      if (inputValue !== '' && Number(inputValue) > 0) {
        if (cart.cartItems.length === 0) {
          dispatch(
            cartReducerActions.add({
              id: props.price_id,
              name: props.name,
              img: props.img,
              dealer: props.dealer,
              price: props.price,
              pincode: props.pincode,
              subcategory_id: props.subcategory_id,
              itemQuantity: inputValue,
              totalPrice: Number(inputValue) * props.price,
              gst: props.gst,
              percentage: props.percentage,
              unit: props.unit,
            })
          );
          toast.success('Added to cart!', { position: 'top-right', theme: 'light' });
        } else if (
          props.dealer === cart.cartItems[0].dealer &&
          props.pincode === cart.cartItems[0].pincode
        ) {
          dispatch(
            cartReducerActions.add({
              id: props.price_id,
              name: props.name,
              img: props.img,
              dealer: props.dealer,
              price: props.price,
              pincode: props.pincode,
              subcategory_id: props.subcategory_id,
              itemQuantity: inputValue,
              totalPrice: Number(inputValue) * props.price,
              gst: props.gst,
              percentage: props.percentage,
              unit: props.unit,
            })
          );
          toast.success('Added to cart!', { position: 'top-right', theme: 'light' });
        } else {
          toast.error(
            'Dealer pickup pincode is different from the previous dealer pincode of your cart items. To add this scrap item, please clear your cart.',
            { position: 'top-right', theme: 'light' }
          );
        }
      } else {
        Swal.fire({
          title: 'Add a quantity before adding to cart',
          confirmButtonColor: '#56b124',
        });
      }
      setInputValue('');
    } else {
      Swal.fire({
        title: 'Please sign in to add to cart',
        confirmButtonColor: '#56b124',
      });
      router.push('/signin');
    }
  };

  return (
    <div className="sell__item__card">
      <img src={`${apiUrl}/${props.img}`} alt={props.name} />
      <div className="description">
        <h1>{props.name}</h1>
        <p>
          Price : <span>{props.price} Rs/Kg</span>
        </p>
        <input
          type="number"
          placeholder="Quantity in Kg"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default SellItemCard;
