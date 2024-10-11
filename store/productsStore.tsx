import { create } from "zustand";
import axios from "axios";
import { Product } from "@constants/types/product";
import { CreateProductOutput, S3UploadOutput } from "@constants/types/state";
import { DATA_STORAGE_SERVICE_ENDPOINT } from "@constants/restConstants";
import { useChatStore } from "./chatStore";
import { sideBarStates } from "./pageStore";

interface ProductState {
  products: Record<string, Product>;
  selectedProductId: string | null;
  fetchProducts: () => void;
  uploadFile: (args: {
    files: FileList;
    productId: string;
    fileType: sideBarStates;
  }) => Promise<void>;
  setSelectedProduct: (product: string) => void;
  createProduct: (product: {
    productName: string;
    productDescription: string;
  }) => Promise<void>;
  deleteFile: (args: {
    fileUrl: string;
    productId: string;
    fileType: sideBarStates;
  }) => Promise<void>;
}

const uploadFile = async ({
  newFiles,
  productId,
}: {
  newFiles: FileList;
  productId: string;
}) => {
  const fileUrls: string[] = [];
  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("productId", productId);
      const res = await axios.post<S3UploadOutput>(
        `${DATA_STORAGE_SERVICE_ENDPOINT}/s3/upload/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fileUrls.push(res.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  return fileUrls;
};

const upsertProduct = async ({ product }: { product: Product }) => {
  const res = await axios.post<CreateProductOutput>(
    `${DATA_STORAGE_SERVICE_ENDPOINT}/api/products`,
    product
  );
  return res.data.productId;
};

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
        `${DATA_STORAGE_SERVICE_ENDPOINT}/api/products`
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
  createProduct: async ({ productDescription, productName }) => {
    const newPorductId = await upsertProduct({
      product: {
        productId: "",
        productName,
        userId: "",
        productDescription,
        fileUris: [],
        interviewTranscripts: [],
        createdAt: Date.now().toString(),
        updatedAT: Date.now().toString(),
      },
    });
    window.open(`/product/${newPorductId}`,"_self");
  },
  uploadFile: async ({ files, productId, fileType }) => {
    const fileUrls = await uploadFile({ newFiles: files, productId });
    set(({ products }) => {
      if (!products[productId]) return { products };
      if (fileType === "Transcripts")
        products[productId].interviewTranscripts = [
          ...(products[productId]?.interviewTranscripts ?? []),
          ...fileUrls,
        ];
      else
        products[productId].fileUris = [
          ...(products[productId]?.fileUris ?? []),
          ...fileUrls,
        ];
      upsertProduct({ product: products[productId] });
      return { products };
    });
  },
  deleteFile: async ({ fileUrl, productId, fileType }) => {
    set(({ products }) => {
      const product = products[productId];
      if (fileType === "Files")
        product.fileUris = product.fileUris.filter(
          (productFileUrl) => productFileUrl !== fileUrl
        );
      else
        product.interviewTranscripts = product.interviewTranscripts.filter(
          (productFileUrl) => productFileUrl !== fileUrl
        );
      upsertProduct({ product });
      products[productId] = product;
      return { products };
    });
  },
}));
