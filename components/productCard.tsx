"use client";
import { Product } from "@constants/types/product";
import { useRouter } from "next/navigation";
import { IoOpenSharp } from "react-icons/io5";

interface ProductCardProps extends Product {
  isSelected: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productDescription,
  productId,
}) => {
  const router = useRouter();
  return (
    <div className="min-w-[30%] max-w-[30%] flex-1  bg-surface-20 p-4 rounded-2xl min-h-40 items-start">
      <div className="flex gap-2">
        <h1 className="text-xl font-semibold">{productName}</h1>
        <li
          className="w-6 h-6 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100 hover:bg-white/30"
          onClick={() => {
            router.push(`/product/${productId}`);
          }}
        >
          <IoOpenSharp />
        </li>
      </div>
      <div className="text-sm text-surface-80">{productDescription}</div>
    </div>
  );
};
