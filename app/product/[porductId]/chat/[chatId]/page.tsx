"use client";
import Chatbox from "@components/chatBox";
import { SideBar } from "@components/sideBar";
import { usePageStore } from "@store/pageStore";
import { useProductStore } from "@store/produtsStore";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const ChatPage = () => {
  const { isNavbarOpen } = usePageStore();
  const { setSelectedProduct, selectedProductId } = useProductStore();
  const { productId } = useParams();

  useEffect(() => {
    if (!productId && selectedProductId === productId) return;
    setSelectedProduct(productId as string);
  }, []);

  return (
    <main
      className={clsx(
        "w-full mx-auto min-h-screen p-6 flex gap-6 transition-all",
        isNavbarOpen ? "pl-[17.5rem]" : "pl-[88px]"
      )}
    >
      <div className="flex flex-col gap-6 h-full flex-1 place-self-end">
        <Chatbox suggestionsPosition="above" />
      </div>
      <SideBar />
    </main>
  );
};

export default ChatPage;
