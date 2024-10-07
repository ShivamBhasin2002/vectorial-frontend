import { ChatAgentAccessor } from "@service/chatAgentAccessor";
import { DataStorageAccessor } from "@service/dataStorageAccessor";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaSpinner, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  type: "User" | "AI";
  content: string;
}

interface ChatSpaceProps {
  productId: string;
}

export const ChatInterface = () => {
  const { productId } = useParams() as Record<string, string>;
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dataStorageAccessor = new DataStorageAccessor();
  const chatAgentAccessor = new ChatAgentAccessor();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const chat = await dataStorageAccessor.getChatByProductId(productId);
        setChatHistory(
          chat.chatMessages.map((msg) => ({
            type: msg.senderType as "User" | "AI",
            content: msg.message,
          }))
        );
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [productId]);

  const getAiResponse = async (
    conversations: { role: string; content: string }[]
  ): Promise<string> => {
    try {
      const response = await chatAgentAccessor.getRagResponse(conversations);
      return response.response;
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const handleNewMessage = async (message: string) => {
    const newUserMessage: ChatMessage = { type: "User", content: message };
    const updatedChatHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedChatHistory);
    setIsLoading(true);

    try {
      const chat = await dataStorageAccessor.getChatByProductId(productId);
      chat.chatMessages.push({ senderType: "User", message });

      const aiResponse = await getAiResponse(
        chat.chatMessages.map((msg) => ({
          role: msg.senderType,
          content: msg.message,
        }))
      );
      const newAiResponse: ChatMessage = { type: "AI", content: aiResponse };
      setChatHistory((prevHistory) => [...prevHistory, newAiResponse]);

      chat.chatMessages.push({ senderType: "AI", message: aiResponse });
      await dataStorageAccessor.createChat(chat);
    } catch (error) {
      console.error("Error updating chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      handleNewMessage(message);
      setMessage("");
    }
  };

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
            msg.type === "User" ? "justify-end" : "justify-start"
          } p-2 my-2`}
        >
          <div className="flex items-center justify-center min-w-10 h-10 rounded-full bg-white shadow-md mr-2">
            {msg.type === "User" && <FaUser className="text-xl" />}
            {msg.type === "AI" && <FaRobot className="text-xl" />}
          </div>
          <div
            className={`flex items-start bg-${
              msg.type === "User" ? "[#daf8e3]" : "gray-200"
            } rounded-xl max-w-4/5 min-w-[2.5%] shadow-sm p-3`}
          >
            <div className="flex-1 text-left">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
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
