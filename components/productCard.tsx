"use client";
import { Product } from "@constants/types/product";
import { useProductStore } from "@store/productsStore";
import { useRouter } from "next/navigation";

interface ProductCardProps extends Product {
  isSelected: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productDescription,
  productId,
}) => {
  const router = useRouter();
  const { setSelectedProduct } = useProductStore();
  return (
    <div
      className="min-w-[30%] max-w-[30%] flex-1  bg-cream border-brown border shadow-md hover:scale-[0.98] transition-all p-4 rounded-2xl min-h-40 items-start cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/product/${productId}`);
        setSelectedProduct(productId, true);
      }}
    >
      <div className="flex gap-2">
        <h1 className="text-xl font-semibold">{productName}</h1>
      </div>
      <div className="text-sm text-surface-80">{productDescription}</div>
    </div>
  );
};
