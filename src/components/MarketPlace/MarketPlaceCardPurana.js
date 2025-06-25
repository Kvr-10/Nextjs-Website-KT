'use client';

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// css
import "@/app/styles/SellItemCard.css";

// redux
import { useDispatch } from "react-redux";
import { cartReducerActions } from "@/Redux/cartReducer";

const MarketPlaceCard = (props) => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  // Safely access localStorage
  const apiKey =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("KTMauth"))
      : null;

  // add to cart
  const addToCart = () => {
    if (apiKey) {
      if (inputValue !== "" && Number(inputValue) > 0) {
        dispatch(
          cartReducerActions.add({
            item: {
              name: props.name,
              price: props.price,
              quantity: inputValue,
              totalPrice: Number(inputValue) * props.price,
            },
          })
        );
        Swal.fire({
          title: "Added to cart",
          confirmButtonColor: "#56b124",
        });
      } else {
        Swal.fire({
          title: "Add a valid quantity before adding to cart",
          confirmButtonColor: "#56b124",
        });
      }
      setInputValue("");
    } else {
      Swal.fire({
        title: "Sign in to add items to your cart",
        confirmButtonColor: "#56b124",
      });
      router.push("/signin");
    }
  };

  return (
    <div className="sell__item__card">
      <img src={props.img} alt={props.name} />
      <div className="description">
        <h1>{props.name}</h1>
        <p>
          Price : <span>{props.price} Rs/Kg</span>
        </p>
        <input
          type="number"
          placeholder="Quantity in Kg"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
