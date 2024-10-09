"use client";
import React, { useEffect } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import clsx from "clsx";
import { useProductStore } from "@store/productsStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePageStore } from "@store/pageStore";
import NewProduct from "./newProduct";

const Navbar = () => {
  const router = useRouter();
  const { products, fetchProducts, selectedProductId, setSelectedProduct } =
    useProductStore();
  const { isNavbarOpen, toggleNavBar, toggleNewProductPanelOpen } =
    usePageStore();

  const handleMouseEnter = () => {
    toggleNavBar(true);
  };

  const handleMouseLeave = () => {
    toggleNavBar(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div
        className={clsx(
          "h-screen bg-mixed-20 text-white flex flex-col items-center p-4 pt-[72px] transition-all duration-300 ease-in-out fixed overflow-hidden left-0 top-0 bottom-0 z-50",
          isNavbarOpen ? "w-64" : "w-16"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex gap-2 fixed top-4 left-4 justify-center items-center cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src="/logo.png" alt="Vectorial logo" width={40} height={40} />
          {isNavbarOpen && (
            <div className="whitespace-nowrap">Vectorial AI</div>
          )}
        </div>
        <div
          className={clsx("flex-1 w-full", isNavbarOpen ? "block" : "hidden")}
        >
          <ul className="overflow-y-auto">
            {Object.values(products).map((product, index) => (
              <li
                key={index}
                className={clsx(
                  "truncate px-2 py-1 hover:bg-primary-40 rounded-lg cursor-pointer mb-1",
                  selectedProductId === product.productId &&
                    "bg-primary-40 hover:bg-primary-80"
                )}
                title={product.productName}
                onClick={() => {
                  setSelectedProduct(product.productId);
                  router.push(`/product/${product.productId}`);
                }}
              >
                {product.productName}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex gap-2 flex-col w-full">
          <button
            className="focus:outline-none hover:bg-primary-100 flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-primary-60 h-8 overflow-hidden"
            onClick={() => {
              toggleNewProductPanelOpen(true);
            }}
          >
            <FaPlus />
            {isNavbarOpen && (
              <div className="whitespace-nowrap">New Product</div>
            )}
          </button>
          <button
            className="focus:outline-none hover:bg-surface-60 flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-surface-80 h-8 overflow-hidden"
            onClick={() => {
              router.push("/product");
            }}
          >
            <FaEye />
            {isNavbarOpen && (
              <div className="whitespace-nowrap">View Products</div>
            )}
          </button>
        </div>
      </div>
      <NewProduct />
    </>
  );
};

export default Navbar;
