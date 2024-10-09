import { Chat } from "@constants/types/chat";
import { useChatStore } from "@store/chatStore";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";

const ChatComponent = ({ chatTitle, chatId }: Chat) => {
  const { setSelectedChatId, selectedChatId } = useChatStore();
  const { productId } = useParams();
  const router = useRouter();
  return (
    <div
      className={clsx(
        "rounded-lg cursor-pointer w-full p-2 bg-white/20 hover:bg-white/10 font-bold overflow-hidden whitespace-nowrap text-ellipsis",
        chatId === selectedChatId &&
          "bg-primary-20 hover:bg-primary-20 text-white"
      )}
      onClick={() => {
        if (!chatId) return;
        setSelectedChatId(chatId);
        router.push(`/product/${productId}/chat/${chatId}`);
      }}
    >
      {chatTitle}
    </div>
  );
};

export const ChatsListing = () => {
  const router = useRouter();
  const { productId } = useParams();
  const { byProductId, byChatId } = useChatStore();
  const chats = byProductId[productId as string]?.map(
    (chatId) => byChatId[chatId]
  );
  return (
    <div className="flex flex-col gap-2 h-full">
      {chats &&
        chats?.length !== 0 &&
        chats.map((chat) => <ChatComponent {...chat} key={chat.chatId} />)}
      <button
        className="focus:outline-none hover:bg-primary-100 flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-primary-60 h-10 mt-auto overflow-hidden"
        onClick={() => {
          router.push(`/product/${productId}`);
        }}
      >
        <FaPlus />
        <div className="whitespace-nowrap text-white font-bold">New Chat</div>
      </button>
    </div>
  );
};
