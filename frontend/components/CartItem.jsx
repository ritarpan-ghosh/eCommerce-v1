import Image from "next/image";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/app/redux/features/cartSlice";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="px-2 py-1">
      <div className="my-2 flex gap-2 text-white">
        <Image
          src={data.attributes.main_img.data.attributes.url}
          width={750}
          height={750}
          className="h-auto w-12 rounded"
          alt="image"
        />
        <div>
          <h1 className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">
            {data.attributes.title}
          </h1>
          <div className="flex">
            <p className="text-sm mt-1">₹{data.totalPrice}</p>
            <div className="flex gap-1 ml-4">
              <button onClick={()=>{dispatch(addToCart(data))}}>
                <PlusCircleIcon className="w-6" />
              </button>
              <p>{data.quantity}</p>
              <button onClick={()=>{dispatch(removeFromCart(data))}}>
                <MinusCircleIcon className="w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
