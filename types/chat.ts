import { Message } from "@types/message";

export interface Chat {
    chatId?: string;
    productId: string;
    userId?: string;
    chatMessages: Message[];
    fileUris: string[];
  }