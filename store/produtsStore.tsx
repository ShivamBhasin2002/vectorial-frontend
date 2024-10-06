import { create } from "zustand";
import axios from "axios";
import { Product } from "@types/product";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  fetchProducts: () => void;
  setSelectedProdcut: (product: Product) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  setSelectedProdcut: (product: Product) => {
    set({ selectedProduct: product });
  },
  fetchProducts: async () => {
    try {
      const response = await axios.get(
        "http://vectorialdemodatastorageenv.eba-gr44gfai.us-west-2.elasticbeanstalk.com/api/products"
      );
      const products = response.data.map((product: Product) => ({
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        fileUris: product.fileUris,
        interviewTranscripts: product.interviewTranscripts,
      }));
      set({ products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
}));
