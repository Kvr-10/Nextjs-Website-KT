'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";

// CSS
import "@/app/styles/Cart.css";
import "@/app/styles/App.css";

// Components
import CartView from "@/components/Cart/CartView";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { stepReducerActions } from "@/Redux/stepReducer";
import { cartReducerActions } from "@/Redux/cartReducer";
import axios from "axios";
import { apiUrl } from "@/lib/Private";

const CartStep3 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [order, setOrder] = useState(null);
  const cart = useSelector((state) => state.cartReducer);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);

    // Safely access localStorage
    const storedAuth = localStorage.getItem("KTMauth");
    const storedOrder = localStorage.getItem("order_details");

    if (storedAuth) setApiKey(JSON.parse(storedAuth));
    if (storedOrder) setOrder(JSON.parse(storedOrder));
  }, []);

  const checkOut = () => {
    if (!apiKey || !order || cart.cartItems.length === 0) return;

    const data = new FormData();
    data.append("customer_id", apiKey.id);
    data.append("dealer_id", cart.cartItems[0].dealer);

    axios.post(`${apiUrl}/api/add_order/`, data)
      .then((res) => {
        const orderData = new FormData();
        orderData.append("cart_order_id", res.data.cart_order_id);
        orderData.append("first_name", order.firstname);
        orderData.append("last_name", order.lastname);
        orderData.append("email", apiKey.email);
        orderData.append("phone_number", order.phone);
        orderData.append("address_line_1", order.add_one);
        orderData.append("address_line_2", order.add_two);
        orderData.append("city", order.city);
        orderData.append("state", order.state);
        orderData.append("country", order.country);
        orderData.append("pickup_date", order.pickup_date);
        orderData.append("pickup_time", order.pickup_time);
        orderData.append("order_note", "zzzz");
        orderData.append("ip", "123456");

        axios.post(`${apiUrl}/api/order_info/`, orderData)
          .then((res) => {
            const confirmData = new FormData();
            confirmData.append("order_info_id", res.data.order_info_id);

            axios.post(`${apiUrl}/api/order_confirm/`, confirmData)
              .then(() => {
                setIsOpen(true);
              });
          }).catch(console.error);
      }).catch(console.error);
  };

  if (!order) return null; // prevent rendering before localStorage is loaded

  return (
    <div className="cart__step">
      <h1>Final Checkout</h1>

      <CartView />

      <div className="final__pickup__address">
        <h1>Pickup Address</h1>
        <div className="pickup__address">
          <div className="left__side">
            <p>Name: <span>{order.firstname}</span></p>
            <p>Mobile Number: <span>{order.phone}</span></p>
            <p>Email ID: <span>{order.email}</span></p>
            <p>Address: <span>{order.add_two}</span></p>
            <p>State: <span>{order.state}</span></p>
          </div>
          <div className="right__side">
            <p>City: <span>{order.city}</span></p>
            <p>House no. / Flat no.: <span>{order.add_one}</span></p>
            <p>Date: <span>{order.pickup_date}</span></p>
            <p>Time Slot: <span>{order.pickup_time}</span></p>
          </div>
        </div>
      </div>

      <button
        className="cart__button"
        onClick={() => dispatch(stepReducerActions.backward("cartStep"))}
      >
        Back
      </button>
      <button
        className="cart__button"
        onClick={checkOut}
      >
        Check out
      </button>

      <Modal
        className="modal__content"
        overlayClassName="modal__overlay"
        isOpen={isOpen}
        ariaHideApp={false}
      >
        <h1>Thanks</h1>
        <p>Your pickup request is placed</p>
        <div>
          <button
            onClick={() => {
              dispatch(cartReducerActions.reset());
              dispatch(stepReducerActions.reset("cartStep"));
              setIsOpen(false);
              localStorage.removeItem("order_details");
              router.push("/sell");
            }}
          >
            Sell again
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CartStep3;
