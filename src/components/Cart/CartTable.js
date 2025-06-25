'use client';

import React from "react";

// CSS
import "@/app/styles/Cart.css";

// React-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { cartReducerActions } from "@/Redux/cartReducer";
import { stepReducerActions } from "@/Redux/stepReducer";

// Router
import { useRouter } from "next/navigation";

// Axios
import axios from "axios";
import { apiUrl } from "@/lib/Private";

const CartTable = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const router = useRouter();
  const apiKey = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("KTMauth")) : null;

  const decrement = (price_list) => {
    dispatch(cartReducerActions.decrement({ id: price_list }));
  };

  const increment = (price_list) => {
    dispatch(cartReducerActions.increment({ id: price_list }));
  };

  const clearCartItems = () => {
    dispatch(cartReducerActions.reset());
    router.push("/sell");
  };

  const deleteCartItem = (price_list) => {
    dispatch(cartReducerActions.remove({ id: price_list }));
  };

  const submitCartData = () => {
    if (cart.cartItems.length <= 10) {
      for (let i = 0; i < cart.cartItems.length; i++) {
        const data = new FormData();
        data.append("customer_id", apiKey?.id);
        data.append("dealer_id", cart.cartItems[i].dealer);
        data.append("price_list_id", cart.cartItems[i].id);
        data.append("subcategory_id", cart.cartItems[i].subcategory_id);
        data.append("subcategory_name", cart.cartItems[i].name);
        data.append("unit", cart.cartItems[i].unit);
        data.append("quantity", cart.cartItems[i].itemQuantity);
        data.append("unit_price", cart.cartItems[i].price);

        axios
          .post(`${apiUrl}/api/add_item/`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      dispatch(stepReducerActions.forward("cartStep"));
    } else {
      toast.error("Cart limit reached! Only 10 items are allowed in an order!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="empty__cart">
        <h1>Your cart is empty</h1>
        <button
          className="cart__button"
          onClick={() => {
            dispatch(stepReducerActions.reset("cartStep"));
            router.push("/sell");
          }}
        >
          Go to sell page
        </button>
      </div>
    );
  }

  return (
    <>
      <button className="clearCartBtn" onClick={clearCartItems}>
        Clear Cart
      </button>
      <div className="cart__table">
        <p>(Scroll left-right to see the full table)</p>
        <table>
          <thead>
            <tr>
              <th>Scrap Name</th>
              <th>Price (Rs)</th>
              <th>Approx. Quantity</th>
              <th>Approx. Total (Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((eachItem, index) => (
              <tr key={index}>
                <td>{eachItem.name}</td>
                <td>{eachItem.price}</td>
                <td>
                  <button onClick={() => decrement(eachItem.id)}>
                    <IndeterminateCheckBoxIcon />
                  </button>
                  {eachItem.itemQuantity}
                  <button onClick={() => increment(eachItem.id)}>
                    <AddBoxIcon />
                  </button>
                </td>
                <td>{eachItem.totalPrice}</td>
                <td>
                  <button onClick={() => deleteCartItem(eachItem.id)}>
                    <DeleteForeverIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>
          Approx. Grand Total :{" "}
          <span>
            {cart.cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)} Rs
          </span>
        </h1>
      </div>
      <button className="cart__button" onClick={submitCartData}>
        Next
      </button>
    </>
  );
};

export default CartTable;
