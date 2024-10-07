export interface CreateChatOutput {
  chatId: string;
  error?: Error;
}

export interface CreateProductOutput {
  productId: string;
  error?: Error;
}

export interface S3UploadOutput {
  url: string;
}
