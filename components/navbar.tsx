"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import clsx from "clsx";
import { useProductStore } from "@store/produtsStore";
import Image from "next/image";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { products, fetchProducts, selectedProduct, setSelectedProdcut } =
    useProductStore();

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={clsx(
        "h-screen bg-mixed-20 text-white flex flex-col items-center p-4 pt-[64px] transition-all duration-300 ease-in-out absolute overflow-hidden",
        isCollapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-2 fixed top-4 left-4 justify-center items-center">
        <Image src="/logo.png" alt="Vectorial logo" width={40} height={40} />
        {!isCollapsed && <div className="whitespace-nowrap">Vectorial AI</div>}
      </div>
      <div className={clsx("flex-1 w-full", isCollapsed ? "hidden" : "block")}>
        <ul className="overflow-y-auto">
          {products.map((product, index) => (
            <li
              key={index}
              className={clsx(
                "truncate px-2 py-1 hover:bg-primary-40 rounded-lg cursor-pointer mb-1",
                selectedProduct?.productId === product.productId &&
                  "bg-primary-40 hover:bg-primary-80"
              )}
              title={product.productName}
              onClick={() => {
                setSelectedProdcut(product);
              }}
            >
              {product.productName}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <button
          className={clsx(
            "focus:outline-none hover:bg-primary-100 flex gap-2 justify-center items-center p-2 rounded-xl w-full",
            !isCollapsed && "bg-primary-60 "
          )}
        >
          <FaPlus />
          {!isCollapsed && <div className="whitespace-nowrap">New Project</div>}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
