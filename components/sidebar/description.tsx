import { useProductStore } from "@store/productsStore";
import React from "react";

const Description = () => {
  const { selectedProductId, products } = useProductStore();
  const { productName, productDescription } = selectedProductId
    ? products[selectedProductId]
    : {};
  return (
    <div className="flex flex-col gap-4">
      <div className="text-black text-lg">
        Product Name: <span className="text-purps font-extrabold">{productName}</span>
      </div>
      <div className="text-black text-lg">
        <div>About Product:</div>{" "}
        <div className="text-purps font-bold">{productDescription}</div>
      </div>
    </div>
  );
};

export default Description;
