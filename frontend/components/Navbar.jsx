"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Cart from "./Cart";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <nav>
      <div className="container mx-auto px-2 h-14 flex justify-between items-center">
        <p>
          <Link className="text-4xl font-bold" href={"/"}>
            eCommerce
          </Link>
        </p>
        <button
          onClick={() => {
            setCartOpen(!cartOpen);
          }}
        >
          <ShoppingBagIcon className="h-12" />
        </button>

        <Cart cartOpen={cartOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
