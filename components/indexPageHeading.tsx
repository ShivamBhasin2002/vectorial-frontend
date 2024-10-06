"use client";
import { useProductStore } from "@store/produtsStore";
import React from "react";

export const Heading = ({}) => {
  const { selectedProduct } = useProductStore();
  return (
    <div className="text-white mb-8 ">
      Continue chatting on product:{" "}
      <strong className="text-primary-60">{selectedProduct?.productName}</strong>{" "}
    </div>
  );
};
