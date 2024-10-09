import { useChatStore } from "@store/chatStore";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FaRobot, FaSpinner, FaUser } from "react-icons/fa";
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
      className="overflow-y-auto max-h-[calc(100vh-271px)] rounded-xl shadow-md scroll-smooth text-primary-40"
    >
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.senderType === "User" ? "justify-end" : "justify-start"
          } p-2 my-2`}
        >
          <div className="flex items-center justify-center min-w-10 h-10 rounded-full bg-white shadow-md mr-2">
            {msg.senderType === "User" && <FaUser className="text-xl" />}
            {msg.senderType === "AI" && <FaRobot className="text-xl" />}
          </div>
          <div
            className={`flex items-start bg-${
              msg.senderType === "User" ? "[#daf8e3]" : "gray-200"
            } rounded-xl max-w-4/5 min-w-[2.5%] shadow-sm p-3`}
          >
            <div className="flex-1 text-left">
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      {showLoading && (
        <div className="flex justify-start p-2 my-2">
          <div className="flex items-center bg-gray-200 rounded-xl max-w-4/5 shadow-sm p-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md mr-2">
              <FaRobot className="text-xl" />
            </div>
            <FaSpinner className="text-xl animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};
