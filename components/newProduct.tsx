import { usePageStore } from "@store/pageStore";
import { useProductStore } from "@store/productsStore";
import clsx from "clsx";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const NewProduct = () => {
  const { isNewProductPanelOpen, toggleNewProductPanelOpen } = usePageStore();
  const { createProduct } = useProductStore();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  return (
    <>
      {isNewProductPanelOpen && (
        <div
          className="left-0 top-0 right-0 bottom-0 bg-black/40 fixed z-[100]"
          onClick={() => {
            toggleNewProductPanelOpen(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "h-screen bg-cream text-black flex flex-col items-center p-4 transition-all duration-300 ease-in-out fixed overflow-hidden right-[-800px] top-0 bottom-0 w-[800px] z-[100] gap-4",
          isNewProductPanelOpen ? "translate-x-[-800px]" : ""
        )}
      >
        <input
          className="w-full rounded-2xl p-4 min-w-[672px] min-h-[24px] bg-white border-borderGray border-2 relative z-10 outline-none"
          placeholder="Product name"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <textarea
          className="w-full rounded-2xl p-4 min-w-[672px] min-h-[200px] bg-white border-borderGray border-2 relative z-10 outline-none flex-1"
          placeholder="Product description"
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
        />
        <button
          className="focus:outline-none hover:bg-green/95 flex gap-2 justify-center items-center p-4 rounded-xl w-full bg-green text-white h-12 overflow-hidden mt-auto font-bold"
          onClick={() => {
            createProduct({
              productName,
              productDescription,
            }).then(({ newProductId }) => {
              window.open(`/dashboard/product/${newProductId}`);
            });
          }}
        >
          <FaPlus />
          <div className="whitespace-nowrap">New Product</div>
        </button>
      </div>
    </>
  );
};

export default NewProduct;
