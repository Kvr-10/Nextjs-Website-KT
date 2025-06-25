'use client';

import React, { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { cartReducerActions } from "@/Redux/cartReducer";

// CSS
import "@/app/styles/SellItemCard.css";

const MarketPlaceSellCard = ({ name, price, img }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const apiKey = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("KTMauth")) : null;

  const addToCart = () => {
    if (apiKey) {
      if (inputValue !== "" && Number(inputValue) > 0) {
        dispatch(
          cartReducerActions.add({
            item: {
              name,
              price,
              quantity: inputValue,
              totalPrice: Number(inputValue) * price,
            },
          })
        );
        Swal.fire({
          title: "Added to cart",
          confirmButtonColor: "#56b124",
        });
        setInputValue("");
      } else {
        Swal.fire({
          title: "Add a quantity before adding to cart",
          confirmButtonColor: "#56b124",
        });
      }
    } else {
      Swal.fire({
        title: "Sign in to add to cart",
        confirmButtonColor: "#56b124",
      });
      router.push("/signin");
    }
  };

  return (
    <div className="sell__item__card">
      <Image src={img} alt="product" width={300} height={200} />
      <div className="description">
        <h1>{name}</h1>
        <p>
          Price : <span>{price} Rs/Kg</span>
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

export default MarketPlaceSellCard;
