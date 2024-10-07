import { DATA_STORAGE_SERVICE_ENDPOINT } from "@constants/restConstants";
import { Chat } from "@constants/types/chat";
import axios from "axios";
import { create } from "zustand";

interface ChatState {
  selectedChatId: string | null;
  byProductId: Record<string, Record<string, Chat>>;
  byChatId: Record<string, Chat>;
  setSelectedChatId: (chatId: string) => void;
  fetchChatsByProductId: (productId: string) => void;
  fetchChat?: (chatId: string) => void;
  createChat: (chat: Chat) => string;
}

export const useChatStore = create<ChatState>((set) => ({
  byProductId: {},
  byChatId: {},
  selectedChatId: null,
  setSelectedChatId: (chatId) => {
    set({ selectedChatId: chatId });
  },
  fetchChatsByProductId: async (productId) => {
    const res = await axios.get<Chat>(
      `${DATA_STORAGE_SERVICE_ENDPOINT}/api/chats/product/${productId}`
    );
    const chatsById = [res.data].reduce(
      (acc, chat) => ({ ...(acc ?? {}), [chat.chatId]: chat }),
      {}
    );
    set(({ byProductId, byChatId }) => ({
      byChatId: { ...byChatId, ...chatsById },
      byProductId: {
        ...byProductId,
        [productId]: { ...(byProductId[productId] ?? {}), ...chatsById },
      },
    }));
  },
  createChat: () => {
    return "";
  },
}));
