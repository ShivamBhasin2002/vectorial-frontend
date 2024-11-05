"use client";
import { useChatStore } from "@store/chatStore";
import { usePageStore } from "@store/pageStore";
import { useProductStore } from "@store/productsStore";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const ListItem = ({ text, url }: { text: string; url: string }) => {
  const router = useRouter();
  return (
    <div
      className="bg-cream text-black p-4 line-clamp-3 rounded-lg min-w-[200px] cursor-pointer whitespace-nowrap"
      onClick={() => {
        router.push(url);
      }}
    >
      {text}
    </div>
  );
};

const HorizontalList = ({ type }: { type: "chats" | "products" }) => {
  const router = useRouter();
  const { setSideBarState } = usePageStore();
  const { byProductId, byChatId, selectedChatId } = useChatStore();
  const { selectedProductId, products } = useProductStore();
  if (
    type === "chats" &&
    (!selectedChatId ||
      !byProductId[selectedChatId] ||
      byProductId[selectedChatId].length !== 0)
  )
    return null;
  if (type === "products" && Object.keys(products).length === 0) return null;
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="text-xl">{type === "chats" ? "Chats" : "Projects"}</div>
        <div
          className="text-sm flex gap-2 items-center cursor-pointer"
          onClick={() => {
            if (type === "chats") {
              router.push(`/dashboard/product/${selectedProductId}`);
              setSideBarState("Chats");
            }
            if (type === "products") {
              router.push(`/dashboard/product`);
            }
          }}
        >
          View all <FaArrowRight />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden mt-4 after:from-transparent after:to-black after:contents">
        {type === "chats" &&
          selectedChatId &&
          Object.values(byProductId[selectedChatId])
            .map((chatId) => byChatId[chatId])
            .map((chat) => (
              <ListItem
                key={`${chat.chatId}`}
                text={chat.chatTitle || ""}
                url={`/dashboard/product/${selectedProductId}/chat/${chat.chatId}`}
              />
            ))}
        {type === "products" &&
          Object.values(products).map((product) => (
            <ListItem
              key={`${product.productId}`}
              text={product.productName}
              url={`/dashboard/product/${selectedProductId}/chat/${product.productId}`}
            />
          ))}
      </div>
    </div>
  );
};

export default HorizontalList;
