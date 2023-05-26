"use client";

import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { setSubTotal } from "@/app/redux/features/cartSlice";
import { useEffect } from "react";
import Link from "next/link";

const Cart = ({ cartOpen }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSubTotal());
  }, [cart, dispatch]);

  return (
    <div
      className={`w-[300px] fixed ${
        cartOpen ? "right-0" : "-right-full"
      } transition-all top-14 h-screen bg-gray-900 z-40`}
    >
      {cartItems.length > 0 &&
        cartItems.map((item) => {
          return <CartItem data={item} key={item.id} />;
        })}
      {cartItems.length > 0 && (
        <div className="flex gap-8 items-center">
          <p className="text-white">SubTotal: {cart.subTotal}</p>
          <Link
            className="px-2 py-1 bg-white rounded"
            href={'/checkout'}
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
