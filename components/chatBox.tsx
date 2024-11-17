"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@store/chatStore";
import { useParams } from "next/navigation";
import { useProductStore } from "@store/productsStore";
import { FaSpinner } from "react-icons/fa";
import { SendIcon } from "@assets/icons/sendIcon";

interface ChatboxProps {
  suggestionsPosition: "above" | "below";
}

const suggestions = [
  "Analyze interviews",
  "Write PRD",
  "Validate Hypothesis",
  "Plan Sprint",
  "Create roadmap",
  "Usability analysis",
  "Design User journey",
  "Analyze user funnel",
  "Prepare Research Questions",
];

const Chatbox: React.FC<ChatboxProps> = ({ suggestionsPosition }) => {
  const [showSuggestions, toggleSuggestions] = useState(true);
  const [showLoading, toggleLoading] = useState(false);
  const { selectedChatId, upsertChat, byChatId, handleNewMessage } =
    useChatStore();
  const { selectedProductId } = useProductStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { chatId } = useParams();

  useEffect(() => {
    if (suggestionsPosition === "below") return;
    if (!chatId && !inputRef.current?.value) toggleSuggestions(true);
    else {
      toggleSuggestions(false);
    }
  }, [chatId]);

  const handleSubmit = async () => {
    const message = inputRef.current?.value;
    if (!message || showLoading) return;
    if (inputRef.current) inputRef.current.value = "";
    const chatHistory = selectedChatId
      ? byChatId[selectedChatId].chatMessages
      : [];
    const chatTitle = selectedChatId
      ? byChatId[selectedChatId].chatTitle ?? "Untitled Chat"
      : "Untitled Chat";
    toggleLoading(true);
    handleNewMessage({ message, chatId: selectedChatId, chatHistory });
    await upsertChat({
      message,
      chatId: selectedChatId,
      chatHistory,
      productId: selectedProductId,
      chatTitle,
    });
    toggleLoading(false);
  };

  const renderSuggestions = () => (
    <div className="bg-white py-3 rounded-2xl w-full flex flex-col gap-3">
      <ul
        className={clsx("flex gap-2 flex-wrap", !showSuggestions && "hidden")}
      >
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="cursor-pointer bg-cream flex gap-2 py-2 px-4 whitespace-nowrap rounded-2xl text-black text-sm"
            onClick={() => {
              const input = inputRef.current;
              if (!input) return;
              input.value = suggestion;
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {suggestionsPosition === "above" &&
        showSuggestions &&
        renderSuggestions()}
      <div className="w-full mx-auto relative">
        <textarea
          ref={inputRef}
          className="w-full rounded-xl p-4 my-3 min-h-[84px] bg-cream relative outline-none text-black"
          placeholder="Message to Vectorial AI Agent regarding Product"
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            handleSubmit();
          }}
          onChange={(e) => {
            if (suggestionsPosition === "below") return;
            if (!e.target.value && !selectedChatId) toggleSuggestions(true);
            else toggleSuggestions(false);
          }}
        />
        <li
          className="w-8 h-8 bg-green cursor-pointer rounded-full flex justify-center items-center text-white hover:bg-green/90 absolute right-6 bottom-7 z-50 "
          onClick={() => {
            handleSubmit();
          }}
        >
          {showLoading ? (
            <FaSpinner className="text-xl animate-spin text-white" />
          ) : (
            <SendIcon />
          )}
        </li>
      </div>
      {suggestionsPosition === "below" &&
        showSuggestions &&
        renderSuggestions()}
    </>
  );
};

export default Chatbox;
