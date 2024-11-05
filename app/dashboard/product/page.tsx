"use client";

import { ProductCard } from "@components/productCard";
import { useProductStore } from "@store/productsStore";

export default function Product() {
  const { products, selectedProductId } = useProductStore();
  return (
    <main className="w-[1024px] mx-auto min-h-screen py-[40px]">
      <div className="text-black mb-8 text-3xl font-bold ">Projects</div>
      <div className="flex gap-4 flex-wrap ">
        {Object.values(products).map((product) => (
          <ProductCard
            key={`product-${product.productId}`}
            isSelected={selectedProductId === product.productId}
            {...product}
          />
        ))}
      </div>
    </main>
  );
}
