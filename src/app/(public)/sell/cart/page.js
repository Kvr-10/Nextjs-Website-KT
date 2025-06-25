'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { stepReducerActions } from "@/Redux/stepReducer";

// CSS
import "@/app/styles/Cart.css";

// Components
import UserProfileSearchbar from "@/components/UserProfileSearchbar";
import CartStep1 from "@/components/Cart/CartStep1";
import CartStep2 from "@/components/Cart/CartStep2";
import CartStep3 from "@/components/Cart/CartStep3";


const CartSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartStep = useSelector((state) => state.stepReducer.cartStep);
  const cart = useSelector((state) => state.cartReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoToSell = () => {
    dispatch(stepReducerActions.reset("cartStep"));
    router.push("/sell");
  };

  const renderCartStep = () => {
    if (cart.cartItems.length > 0) {
      if (cartStep === 1) return <CartStep1 />;
      if (cartStep === 2) return <CartStep2 />;
      if (cartStep === 3) return <CartStep3 />;
    } else {
      return (
        <div className="empty__cart">
          <h1>Your cart is empty</h1>
          <button className="cart__button" onClick={handleGoToSell}>
            Go to sell page
          </button>
        </div>
      );
    }
  };

  return (
    <>
     
      <UserProfileSearchbar />
      {renderCartStep()}
     
    </>
  );
};

export default CartSection;
