// import { BinIcon } from "@assets/icons/binIcon";
import { ChatIcon } from "@assets/icons/chaticon";
import { EditIcon } from "@assets/icons/editIcon";
import { RightChevronIcon } from "@assets/icons/rightChevron";
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
  const openChatHandler = () => {
    if (!chatId) return;
    setSelectedChatId(chatId);
    router.push(`/dashboard/product/${productId}/chat/${chatId}`);
  };
  // const deleteChatHandler = () => {};
  const editChatNameHandler = () => {};
  return (
    <div
      className={clsx(
        "w-full px-4 py-3 flex group items-center",
        chatId === selectedChatId && "bg-brown/20 rounded-xl  text-black"
      )}
    >
      <ChatIcon className="mr-4" />
      <div className="w-[180px]">{chatTitle}</div>
      <div className="flex gap-2 ml-auto">
        <EditIcon
          className="cursor-pointer hidden group-hover:block"
          onClick={editChatNameHandler}
        />
        {/* <BinIcon
          className="cursor-pointer hidden group-hover:block"
          onClick={deleteChatHandler}
        /> */}
        <RightChevronIcon
          className="cursor-pointer"
          onClick={openChatHandler}
        />
      </div>
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
        className="focus:outline-none flex gap-2 justify-center items-center p-2 w-full text-white bg-green h-12 mt-auto rounded-3xl"
        onClick={() => {
          router.push(`/dashboard/product/${productId}`);
        }}
      >
        <FaPlus />
        <div className="whitespace-nowrap text-white font-bold">New Chat</div>
      </button>
    </div>
  );
};
