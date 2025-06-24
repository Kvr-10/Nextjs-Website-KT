'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';


import '@/app/styles/UserDealerPickupCard.css';
import { apiUrl } from '@/lib/Private';

const DealerPickupCard = (props) => {
  const router = useRouter();

  const cancelPickup = () => {
    const data = new FormData();
    data.append('status', 'Cancelled by Dealer');
    axios
      .patch(`${apiUrl}/api/order_confirm/${props.order_no}/`, data)
      .then(() => {
        Swal.fire({ title: 'Order Cancelled', confirmButtonColor: '#56b124' });
        router.push('/dealer/home');
      })
      .catch((err) => console.log(err));
  };

  const confirmPickup = () => {
    const data = new FormData();
    data.append('status', 'Accepted');
    axios
      .patch(`${apiUrl}/api/order_confirm/${props.order_no}/`, data)
      .then(() => {
        Swal.fire({ title: 'Order Accepted', confirmButtonColor: '#56b124' });
        router.push('/dealer/home');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="user__dealer__pickup__card">
      <div className="left__side">
        <Image src="/Image/pick-up-truck.png" alt="Pickup Truck" width={100} height={100} />
      </div>
      <div className="right__side">
        <p>Order No: <span>{props.order_no}</span></p>
        <p>On: <span>{props.date?.slice(0, 10)}</span></p>
        <p>Total Cart Items: <span>{props.total_cart_items}</span></p>
        <p>Total Amount: <span>{props.total_amount} Rs.</span></p>
        <p>Status: <span>{props.status}</span></p>

        {props.status === 'Accepted' && (
          <div className="pickup__btns">
            <button onClick={cancelPickup}>Cancel</button>
          </div>
        )}

        {props.status === 'New' && (
          <div className="pickup__btns">
            <button onClick={cancelPickup}>Cancel</button>
            <button onClick={confirmPickup}>Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerPickupCard;
