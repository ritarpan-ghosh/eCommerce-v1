"use client"

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cartItems: [],
  subTotal: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((p)=>p.id===action.payload.id)
      if(item){
        item.quantity++
        item.totalPrice = item.quantity*item.attributes.price
      }else{
        state.cartItems.push({...action.payload, quantity: 1, totalPrice: action.payload.attributes.price})
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((p)=>p.id===action.payload.id)
      if (item.quantity > 1){
        item.quantity--
        item.totalPrice = item.quantity*item.attributes.price
      }else if (item.quantity <= 1){
        state.cartItems = state.cartItems.filter((p)=>p.id !== action.payload.id)
      }
    },
    setSubTotal: (state) =>{
      let total = 0;
      state.cartItems.map((item) => {
        total = total + item.totalPrice
      });
      state.subTotal = total
    }
  },
});

export const { addToCart, removeFromCart, setSubTotal } = cartSlice.actions;
export default cartSlice.reducer;
