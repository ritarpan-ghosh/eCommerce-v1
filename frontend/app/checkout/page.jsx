"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSubTotal } from "@/app/redux/features/cartSlice";
import Image from "next/image";
import { makePaymentRequest } from "@/http";
import { stripePromise } from "@/utils/Checkout";


const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSubTotal());
  }, [cart, dispatch]);
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    const stripe = await stripePromise;
    try {
      setLoading(true);
      const res = await makePaymentRequest({
        products: cartItems,
      });
      console.log(res)
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold mb-6">Review Products:</h1>
        {cartItems.length <= 0 ? (
          <p className="text-center">No products are here.</p>
        ) : (
          <div>
            {cartItems.map((item) => {
              return (
                <div className="my-6" key={item.id}>
                  <div className="flex">
                    <Image
                      alt="Image"
                      width={750}
                      height={750}
                      className="h-auto w-14 rounded"
                      src={item.attributes.main_img.data.attributes.url}
                    />
                    <div>
                      <p className="text-xl text-ellipsis lg:max-w-5xl md:max-w-3xl sm:max-w-lg max-w-sm whitespace-nowrap overflow-x-hidden">
                        {item.attributes.title}
                      </p>
                      <p className="text-base">₹{item.totalPrice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="text-xl">SubTotal: {cart.subTotal}</p>
            <button
              className="px-2 py-2 bg-blue-700 rounded text-white outline-none hover:bg-blue-600"
              onClick={handlePayment}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
