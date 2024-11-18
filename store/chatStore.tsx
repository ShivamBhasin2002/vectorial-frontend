import {
  CHAT_AGENT_API_ENDPOINT,
  DATA_STORAGE_SERVICE_ENDPOINT,
} from "@constants/restConstants";
import { Chat } from "@constants/types/chat";
import { CreateChatOutput } from "@constants/types/state";
import axios from "axios";
import { create } from "zustand";

export interface ChatMessage {
  type: "User" | "AI";
  content: string;
}

const getRagResponse = async (args: {
  productId: string;
  chatId: string;
  message?: string | null;
}): Promise<string | null> => {
  if (!args.message) return Promise.resolve(null);
  try {
    const chatRequest = {
      product_id: args.productId,
      thread_id: args.chatId,
      human_input: args.message,
    };

    const response = await axios.post<{ response: string }>(
      `${CHAT_AGENT_API_ENDPOINT}/agent/langgraph/`,
      chatRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "Sorry, I couldn't process your request.";
  }
};

interface ChatState {
  selectedChatId?: string | null;
  showLoading: boolean;
  byProductId: Record<string, string[]>;
  byChatId: Record<string, Chat>;
  setSelectedChatId: (chatId?: string | null) => void;
  fetchChatsByProductId: ({
    productId,
    pageSize,
    pageToken,
    setLatestChatId,
  }: {
    productId: string;
    pageSize?: number;
    pageToken?: number;
    setLatestChatId?: boolean;
  }) => void;
  fetchChat?: (chatId: string) => void;
  upsertChat: (args: {
    message?: string | null;
    chatId: string | null;
    productId?: string | null;
    chatHistory: Chat["chatMessages"];
    chatTitle: string;
  }) => Promise<void>;
  handleNewMessage: (args: {
    message: string;
    chatId: string | null;
    productId?: string;
    chatHistory: Chat["chatMessages"];
  }) => void;
  deleteChat: ({
    chatId,
    selectedProductId,
  }: {
    chatId: string;
    selectedProductId: string;
  }) => void;
}

const upsertChat = async (chat: Chat) => {
  const res = await axios.post<CreateChatOutput>(
    `${DATA_STORAGE_SERVICE_ENDPOINT}/api/chats`,
    chat
  );
  return res.data.chatId;
};

export const useChatStore = create<ChatState>((set) => ({
  byProductId: {},
  byChatId: {},
  selectedChatId: null,
  showLoading: false,
  setSelectedChatId: (chatId) => {
    set({ selectedChatId: chatId });
  },
  fetchChatsByProductId: async ({
    productId,
    pageSize = 25,
    pageToken,
    setLatestChatId,
  }) => {
    const res = await axios.get<{ chats: Chat[] }>(
      `${DATA_STORAGE_SERVICE_ENDPOINT}/api/chats/product/${productId}/list?pageSize=${pageSize}${
        pageToken ? `&pageToken=${pageToken}` : ""
      }`
    );
    const chatsById = res.data.chats.reduce(
      (acc, chat) => ({ ...(acc ?? {}), [chat.chatId || ""]: chat }),
      {}
    );
    const { chatId: latestChatId } = res.data.chats.reduce(
      (acc: Chat, chat: Chat) => {
        if (!acc) return chat;
        if (acc.updatedAt && !chat.updatedAt) return acc;
        if (!acc.updatedAt && chat.updatedAt) return chat;
        if (acc.updatedAt && chat.updatedAt && acc.updatedAt > chat.updatedAt)
          return chat;
        if (acc.updatedAt && chat.updatedAt && acc.updatedAt < chat.updatedAt)
          return acc;
        return chat;
      }
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
      ...(setLatestChatId && { selectedChatId: latestChatId }),
    }));
  },
  handleNewMessage: ({ message, chatHistory, chatId }) => {
    const updatedChat = [...chatHistory, { senderType: "User", message }];
    set(({ byChatId }) => {
      if (!chatId) return {};
      byChatId[chatId].chatMessages = updatedChat;
      return { byChatId, showLoading: true };
    });
  },
  upsertChat: async ({
    message,
    chatHistory,
    chatId: chatIdFromProps,
    productId,
    chatTitle,
  }) => {
    let chatId = chatIdFromProps;
    const updatedChat = message
      ? [...(chatHistory ?? []), { senderType: "User", message }]
      : chatHistory;
    set(({ byChatId }) => {
      if (!chatId) return {};
      byChatId[chatId].chatMessages = updatedChat;
      byChatId[chatId].chatTitle = chatTitle || byChatId[chatId].chatTitle;
      upsertChat(byChatId[chatId]);
      return { byChatId, showLoading: true };
    });
    if (!chatId) {
      chatId = await upsertChat({
        chatId: null,
        productId: productId ?? "",
        userId: null,
        chatTitle,
        createAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        chatMessages: updatedChat,
        fileUris: [],
      });
    }
    const aiResponse = await getRagResponse({
      productId: productId || "",
      message,
      chatId,
    });
    if (aiResponse)
      await upsertChat({
        chatId,
        productId: productId ?? "",
        userId: null,
        chatTitle,
        createAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        chatMessages: [
          ...updatedChat,
          { senderType: "AI", message: aiResponse },
        ],
        fileUris: [],
      });
    if (!chatIdFromProps)
      window.open(`/dashboard/product/${productId}/chat/${chatId}`, "_self");
    set(({ byChatId }) => {
      if (!chatId || !aiResponse) return {};
      if (byChatId[chatId])
        byChatId[chatId] = {
          chatId,
          productId: productId ?? "",
          userId: null,
          chatTitle,
          createAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
          chatMessages: [
            ...updatedChat,
            { senderType: "AI", message: aiResponse },
          ],
          fileUris: [],
        };
      else if (byChatId[chatId])
        byChatId[chatId].chatMessages = [
          ...updatedChat,
          { senderType: "AI", message: aiResponse },
        ];
      upsertChat(byChatId[chatId]);
      return { byChatId, selectedChatId: chatId };
    });
    set({ showLoading: false });
  },
  deleteChat: async ({ chatId, selectedProductId }) => {
    set(({ byChatId, byProductId }) => {
      delete byChatId[chatId];
      byProductId[selectedProductId] = byProductId[selectedProductId].filter(
        (cId) => chatId !== cId
      );
      return { byChatId, byProductId };
    });
    await axios.delete(`${DATA_STORAGE_SERVICE_ENDPOINT}/api/chats/${chatId}`);
  },
}));
