import { useProductStore } from "@store/productsStore";
import React from "react";

const Description = () => {
  const { selectedProductId, products } = useProductStore();
  const { productName, productDescription } = selectedProductId
    ? products[selectedProductId]
    : {};
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white text-lg">
        Product Name: <span className="text-primary-40">{productName}</span>
      </div>
      <div className="text-white text-lg">
        <div>About Product:</div>{" "}
        <div className="text-primary-40">{productDescription}</div>
      </div>
    </div>
  );
};

export default Description;
