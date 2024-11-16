import VectorialLogo from "@assets/icons/vectorialLogo";
import { useChatStore } from "@store/chatStore";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FaSpinner, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export const ChatInterface = () => {
  const { productId } = useParams() as Record<string, string>;
  const { selectedChatId, byChatId, fetchChatsByProductId, showLoading } =
    useChatStore();
  const chatHistory = selectedChatId
    ? byChatId[selectedChatId]?.chatMessages ?? []
    : [];
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedChatId && productId) return;
    fetchChatsByProductId(productId);
  }, [selectedChatId, fetchChatsByProductId, productId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      ref={chatContainerRef}
      className="overflow-y-auto max-h-[calc(100vh-131px)] rounded-xl  scroll-smooth text-black pr-2 py-6 relative"
    >
      <div className="w-full h-6 bg-gradient-to-b from-white to-transparent sticky -top-6" />
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={clsx(
            "flex rounded-xl p-2 my-2",
            msg.senderType === "User"
              ? "justify-end w-fit ml-auto"
              : "justify-start"
          )}
        >
          {msg.senderType === "AI" && (
            <div className="flex items-center justify-center min-w-10 h-10 rounded-full bg-brown mr-3 mt-auto text-white">
              <VectorialLogo className="text-xl" />
            </div>
          )}
          <div
            className={clsx(
              `rounded-xl max-w-4/5 min-w-[2.5%] p-4 bg-cream`,
              msg.senderType === "User"
                ? "justify-end ml-20 bg-green text-white"
                : "justify-start mr-20"
            )}
          >
            <ReactMarkdown>{msg.message}</ReactMarkdown>
          </div>
          {msg.senderType === "User" && (
            <div className="flex items-center justify-center min-w-10 h-10 rounded-full bg-brown ml-3 mt-auto text-white">
              <FaUser className="text-xl" />
            </div>
          )}
        </div>
      ))}
      {showLoading && (
        <div className="flex justify-start">
          <div className="flex items-center rounded-xl max-w-4/5 p-3">
            <div className="flex items-center justify-center min-w-10 h-10 rounded-full bg-brown mr-3 mt-auto text-white">
              <VectorialLogo className="text-xl" />
            </div>
            <FaSpinner className="text-xl animate-spin" />
          </div>
        </div>
      )}
      <div className="w-full h-6 -mt-6 bg-gradient-to-t from-white to-white/0 sticky -bottom-6" />
    </div>
  );
};
