import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartItems",
    initialState: {
      cartItems: [],
    },
    reducers: {
      addToCart: (state, action) => {
        const { payload } = action;
        state.cartItems = [...state.cartItems, payload];
      },
      removeFromCart: (state, action) => {
        const { payload } = action;
        const newCart = state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.id
        );
        state.cartItems = newCart;
      },
    },
  });

const {actions, reducer} = cartSlice;
export const {addToCart, removeFromCart} = actions;
export default reducer;