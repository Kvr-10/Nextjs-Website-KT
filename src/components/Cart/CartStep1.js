'use client';

import React, { useEffect } from "react";

// CSS
import "@/app/styles/Cart.css";

// Components
import CartTable from "@/components/Cart/CartTable";

const CartStep1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set initial localStorage for order details
  useEffect(() => {
    localStorage.setItem(
      "order_details",
      JSON.stringify({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        add_one: "",
        add_two: "",
        city: "",
        state: "",
        country: "India",
        pickup_date: "",
        pickup_time: "",
      })
    );
  }, []);

  return (
    <div className="cart__step">
      <h1>Your Cart</h1>
      <CartTable />

      {/* Button for Next Step — enable only if step reducer is connected */}
      {/* <button
        className="cart__button"
        onClick={() => dispatch(stepReducerActions.forward("cartStep"))}
      >
        Next
      </button> */}
    </div>
  );
};

export default CartStep1;
