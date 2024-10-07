import { Chat } from "@constants/types/chat";
import { useChatStore } from "@store/chatStore";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React from "react";

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
        setSelectedChatId(chatId);
        router.push(`/product/${productId}/chat/${chatId}`)
      }}
    >
      {chatTitle}
    </div>
  );
};

export const ChatsListing = () => {
  const { productId } = useParams();
  const { byProductId } = useChatStore();
  const chats = byProductId[productId as string];
  return (
    <div className="flex flex-col gap-2">
      {chats &&
        Object.values(chats).map((chat) => (
          <ChatComponent {...chat} key={chat.chatId} />
        ))}
    </div>
  );
};
