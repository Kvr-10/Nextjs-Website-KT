import { createSlice } from "@reduxjs/toolkit";

// move localStorage access inside a function
const getInitialCartItems = () => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
  }
  return []; // default for server
};

const initialState = {
  cartItems: getInitialCartItems(),
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartReducer = createSlice({
  name: "cart reducer",
  initialState,
  reducers: {
    add(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].itemQuantity =
          Number(state.cartItems[itemIndex].itemQuantity) + Number(action.payload.itemQuantity);
        state.cartItems[itemIndex].totalPrice =
          Number(state.cartItems[itemIndex].itemQuantity) * Number(action.payload.price);
      } else {
        const tempProduct = { ...action.payload };
        state.cartItems.push(tempProduct);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    remove(state, action) {
      const newState = state.cartItems.filter(
        (eachItem) => eachItem.id !== action.payload.id
      );

      state.cartItems = newState;

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(newState));
      }
    },
    increment(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].itemQuantity += 1;
        state.cartItems[itemIndex].totalPrice =
          state.cartItems[itemIndex].itemQuantity * state.cartItems[itemIndex].price;

        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },
    decrement(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].itemQuantity > 1) {
        state.cartItems[itemIndex].itemQuantity -= 1;
        state.cartItems[itemIndex].totalPrice =
          state.cartItems[itemIndex].itemQuantity * state.cartItems[itemIndex].price;

        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },
    reset(state) {
      state.cartItems = [];

      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
  },
});

export const cartReducerActions = cartReducer.actions;
export default cartReducer.reducer;
