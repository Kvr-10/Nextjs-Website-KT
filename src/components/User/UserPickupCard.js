'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import Image from 'next/image'; // ✅ Using next/image for optimized images

// CSS
import '@/app/styles/UserDealerPickupCard.css';

// API URL
import { apiUrl } from '@/lib/Private';

const UserPickupCard = ({ order_no, date, total_cart_items, total_amount, status }) => {
  const router = useRouter();

  const cancelPickup = () => {
    const data = new FormData();
    data.append('status', 'Cancelled by Customer');

    axios
      .patch(`${apiUrl}/api/order_confirm/${order_no}/`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Order Cancelled',
          confirmButtonColor: '#56b124',
        });
        router.push('/sell/user/profile');
      })
      .catch((err) => {
        console.error('Cancel pickup error:', err);
      });
  };

  return (
    <div className="user__dealer__pickup__card">
      <div className="left__side">
        <Image
          src="/Image/pick-up-truck.png" // ✅ Path relative to `public/`
          alt="Pickup Truck"
          width={80}
          height={80}
        />
      </div>
      <div className="right__side">
        <p>
          Order_no : <span>{order_no}</span>
        </p>
        <p>
          On : <span>{date?.slice(0, 10)}</span>
        </p>
        <p>
          Total Cart Items : <span>{total_cart_items}</span>
        </p>
        <p>
          Total Amount : <span>{total_amount} Rs.</span>
        </p>
        <p>
          Status : <span>{status}</span>
        </p>
        {status !== 'Cancelled by Dealer' && status !== 'Cancelled by Customer' && (
          <div className="pickup__btns">
            <button onClick={cancelPickup}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPickupCard;
