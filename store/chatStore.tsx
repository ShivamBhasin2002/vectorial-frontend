import {
  CHAT_AGENT_API_ENDPOINT,
  DATA_STORAGE_SERVICE_ENDPOINT,
} from "@constants/restConstants";
import { Chat } from "@constants/types/chat";
import axios from "axios";
import { create } from "zustand";

export interface ChatMessage {
  type: "User" | "AI";
  content: string;
}

const getRagResponse = async (
  conversations: { role: string; content: string }[]
): Promise<string> => {
  try {
    const response = await axios.post<{ response: string }>(
      `${CHAT_AGENT_API_ENDPOINT}/rag/`,
      { conversations },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.log("checkpoint");
    console.error("Error getting AI response:", error);
    return "Sorry, I couldn't process your request.";
  }
};

interface ChatState {
  selectedChatId: string | null;
  showLoading: boolean;
  byProductId: Record<string, string[]>;
  byChatId: Record<string, Chat>;
  setSelectedChatId: (chatId: string) => void;
  fetchChatsByProductId: (
    productId: string,
    pageSize?: number,
    pageToken?: number
  ) => void;
  fetchChat?: (chatId: string) => void;
  upsertChat: (args: {
    message: string;
    chatId: string | null;
    productId?: string;
    chatHistory: Chat["chatMessages"];
  }) => void;
  handleNewMessage: (args: {
    message: string;
    chatId: string | null;
    productId?: string;
    chatHistory: Chat["chatMessages"];
  }) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  byProductId: {},
  byChatId: {},
  selectedChatId: null,
  showLoading: false,
  setSelectedChatId: (chatId) => {
    set({ selectedChatId: chatId });
  },
  fetchChatsByProductId: async (productId, pageSize = 25, pageToken) => {
    const res = await axios.get<{ chats: Chat[] }>(
      `${DATA_STORAGE_SERVICE_ENDPOINT}/api/chats/product/${productId}/list?pageSize=${pageSize}${
        pageToken ? `&pageToken=${pageToken}` : ""
      }`
    );
    const chatsById = res.data.chats.reduce(
      (acc, chat) => ({ ...(acc ?? {}), [chat.chatId]: chat }),
      {}
    );
    set(({ byProductId, byChatId }) => ({
      byChatId: { ...byChatId, ...chatsById },
      byProductId: {
        ...byProductId,
        [productId]: [
          ...(byProductId[productId] ?? []),
          ...Object.keys(chatsById).filter(
            (chatId) => !byProductId[productId]?.includes(chatId)
          ),
        ],
      },
    }));
  },
  handleNewMessage: ({ message, chatHistory, chatId }) => {
    const updatedChat = [...chatHistory, { senderType: "User", message }];
    set(({ byChatId }) => {
      byChatId[chatId].chatMessages = updatedChat;
      return { byChatId, showLoading: true };
    });
  },
  upsertChat: async ({ message, chatHistory, chatId }) => {
    const updatedChat = [...chatHistory, { senderType: "User", message }];
    set(({ byChatId }) => {
      byChatId[chatId].chatMessages = updatedChat;
      return { byChatId, showLoading: true };
    });
    const aiResponse = await getRagResponse(
      updatedChat.map((msg) => ({
        role: msg.senderType,
        content: msg.message,
      }))
    );
    set(({ byChatId }) => {
      byChatId[chatId].chatMessages = [
        ...updatedChat,
        { senderType: "AI", message: aiResponse },
      ];
      return { byChatId };
    });
    set({ showLoading: false });
  },
}));
