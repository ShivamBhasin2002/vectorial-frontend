"use client";

import { ProductCard } from "@components/productCard";
import { useProductStore } from "@store/productsStore";

export default function Product() {
  const { products, selectedProductId } = useProductStore();
  return (
    <main className="w-[1024px] mx-auto min-h-screen pt-[80px]">
      <div className="text-white mb-8 text-3xl font-bold ">Products</div>
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
};
