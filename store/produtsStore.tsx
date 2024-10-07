import { create } from "zustand";
import axios from "axios";
import { Product } from "@constants/types/product";
import { S3UploadOutput } from "@constants/types/state";
import { DATA_STORAGE_SERVICE_ENDPOINT } from "@constants/restConstants";
import { useChatStore } from "./chatStore";

interface ProductState {
  products: Record<string, Product>;
  selectedProductId: string | null;
  fetchProducts: () => void;
  uploadFile: (args: {
    file: File;
    productId: string;
    fileType: "interviewTranscript" | "file";
  }) => void;
  setSelectedProduct: (product: string) => void;
  createProduct: (product: Product) => string;
}

export const useProductStore = create<ProductState>((set) => ({
  products: {},
  selectedProductId: null,
  setSelectedProduct: (selectedProductId: string) => {
    if (!selectedProductId) return;
    set({ selectedProductId });
    useChatStore.getState().fetchChatsByProductId(selectedProductId);
  },
  fetchProducts: async () => {
    try {
      const response = await axios.get<Product[]>(
        "http://vectorialdemodatastorageenv.eba-gr44gfai.us-west-2.elasticbeanstalk.com/api/products"
      );
      const productsArr = response.data;
      const products = productsArr.reduce(
        (acc: Record<string, Product> | undefined, product: Product) => ({
          ...(acc ?? {}),
          [product.productId]: product,
        }),
        {}
      );
      set({ products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  createProduct: () => "",
  uploadFile: async ({ file, productId, fileType }) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const res = await axios.post<S3UploadOutput>(
      `${DATA_STORAGE_SERVICE_ENDPOINT}/s3/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const fileUrl = res.data.url;
    set(({ products }) => {
      if (fileType === "interviewTranscript")
        products[productId].interviewTranscripts.push(fileUrl);
      else products[productId].fileUris.push(fileUrl);

      return { products };
    });
  },
}));
