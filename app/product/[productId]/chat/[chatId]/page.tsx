"use client";
import Chatbox from "@components/chatBox";
import { ChatInterface } from "@components/chatInterface";
import { SideBar } from "@components/sidebar/index";
import { useChatStore } from "@store/chatStore";
import { usePageStore } from "@store/pageStore";
import { useProductStore } from "@store/productsStore";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const ChatPage = () => {
  const { isNavbarOpen } = usePageStore();
  const { setSelectedProduct, selectedProductId } = useProductStore();
  const { setSelectedChatId } = useChatStore();
  const { productId, chatId } = useParams();

  useEffect(() => {
    if (!productId && selectedProductId === productId) return;
    setSelectedProduct(productId as string);
  }, [productId]);

  useEffect(() => {
    setSelectedChatId(chatId as string);
  }, [chatId]);

  return (
    <main
      className={clsx(
        "w-full mx-auto min-h-screen max-h-screen p-6 flex gap-6 transition-all duration-300 ease-in-out",
        isNavbarOpen ? "pl-[17.5rem]" : "pl-[88px]"
      )}
    >
      <div className="flex flex-col gap-6 h-full flex-1 place-self-end">
        <ChatInterface />
        <Chatbox suggestionsPosition="above" />
      </div>
      <SideBar />
    </main>
  );
};

export default ChatPage;
