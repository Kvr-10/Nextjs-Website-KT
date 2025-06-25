'use client';

import React from 'react';

// CSS (adjust path if needed)
import '@/app/styles/Cart.css';

// Redux
import { useSelector } from 'react-redux';

const CartView = () => {
  const cart = useSelector((state) => state.cartReducer);

  return (
    <>
      <div className="cart__table">
        <p>(Scroll left-right to see the full table)</p>
        <table>
          <thead>
            <tr>
              <th>Scrap Name</th>
              <th>Price (Rs)</th>
              <th>Approx. Quantity</th>
              <th>Approx. Total (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((eachItem, index) => (
              <tr key={index}>
                <td>{eachItem.name}</td>
                <td>{eachItem.price}</td>
                <td>{eachItem.itemQuantity}</td>
                <td>{eachItem.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          Approx. Grand Total :{' '}
          <span>
            {cart.cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)} Rs
          </span>
        </h1>
      </div>
    </>
  );
};

export default CartView;
