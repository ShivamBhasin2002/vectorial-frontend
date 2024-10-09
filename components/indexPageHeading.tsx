"use client";
import { useProductStore } from "@store/productsStore";
import React from "react";

export const Heading = ({}) => {
  const { selectedProductId, products } = useProductStore();
  return (
    <div className="text-white mb-8 ">
      Continue chatting on product:{" "}
      <strong className="text-primary-60">
        {selectedProductId && products[selectedProductId]?.productName}
      </strong>{" "}
    </div>
  );
};
