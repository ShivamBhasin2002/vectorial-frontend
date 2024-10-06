import { DATA_STORAGE_SERVICE_ENDPOINT } from "../constants/restConstants";
import { Chat } from "../types/chat";
import { Product } from "../types/product";
import { RestApiClient } from "./restClient";

interface CreateChatOutput {
  chatId: string;
  error?: Error;
}

interface CreateProductOutput {
  productId: string;
  error?: Error;
}

interface S3UploadOutput {
  url: string;
}

export class DataStorageAccessor {
  private client: RestApiClient;

  constructor() {
    this.client = new RestApiClient(DATA_STORAGE_SERVICE_ENDPOINT);
  }

  // Chat-related methods
  async getChatById(chatId: string): Promise<Chat> {
    return this.client.get<Chat>(`/api/chats/${chatId}`);
  }

  async getChatByProductId(productId: string): Promise<Chat> {
    return this.client.get<Chat>(`/api/chats/product/${productId}`);
  }

  async createChat(chat: Chat): Promise<CreateChatOutput> {
    return this.client.post<CreateChatOutput>('/api/chats', chat);
  }

  // Product-related methods
  async getAllProducts(): Promise<Product[]> {
    return this.client.get<Product[]>('/api/products');
  }

  async getProductById(productId: string): Promise<Product> {
    return this.client.get<Product>(`/api/products/${productId}`);
  }

  async createProduct(product: Product): Promise<CreateProductOutput> {
    return this.client.post<CreateProductOutput>('/api/products', product);
  }

  // S3-related method
  async uploadFile(file: File): Promise<S3UploadOutput> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.client.post<S3UploadOutput>('/s3/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}