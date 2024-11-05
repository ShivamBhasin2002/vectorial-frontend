"use client";
import { useProductStore } from "@store/productsStore";
import React, { useEffect } from "react";

export const Heading = ({}) => {
  const { selectedProductId, products, setSelectedProduct } = useProductStore();
  useEffect(() => {
    if (!products || !Object.keys(products).length) return;
    const recentProduct = Object.values(products).reduce((acc, curr) => {
      if (!acc) return curr;
      if (acc.updatedAT > curr.createdAt) return acc;
      return curr;
    });
    setSelectedProduct(recentProduct.productId);
  }, [products]);
  return (
    <div className="text-black mb-8 font-bold">
      Continue chatting on product:{" "}
      <strong className="text-brown font-extrabold">
        {selectedProductId && products[selectedProductId]?.productName}
      </strong>{" "}
    </div>
  );
};
