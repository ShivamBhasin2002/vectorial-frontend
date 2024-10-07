import { Message } from "@constants/types/message";

export interface Chat {
  chatId: string;
  productId: string;
  userId: string;
  chatTitle: string;
  createAt: string;
  updatedAt: string;
  chatMessages: Message[];
  fileUris: string[];
}
