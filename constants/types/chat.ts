import { Message } from "@constants/types/message";

export interface Chat {
  chatId: string | null;
  productId: string | null;
  userId: string | null;
  chatTitle: string| null;
  createAt: string| null;
  updatedAt: string|null;
  chatMessages: Message[];
  fileUris: string[];
}
