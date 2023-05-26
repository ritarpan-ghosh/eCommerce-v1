"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/features/cartSlice";

const AddToCartButton = ({p}) => {
  const dispatch = useDispatch();
  return (
    <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 transition-all rounded" onClick={()=>{dispatch(addToCart({...p}))}}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
