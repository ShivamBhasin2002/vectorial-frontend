"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@store/chatStore";
import { useProductStore } from "@store/productsStore";
import { FaSpinner } from "react-icons/fa";
import { SendIcon } from "@assets/icons/sendIcon";

interface ChatboxProps {
  suggestionsPosition: "above" | "below";
  showSuggestion?: boolean;
  showHeading?: boolean;
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

const Chatbox: React.FC<ChatboxProps> = ({
  suggestionsPosition,
  showSuggestion,
  showHeading,
}) => {
  const [showSuggestionState, toggleSuggestions] = useState(true);
  const [showLoading, toggleLoading] = useState(false);
  const { selectedChatId, upsertChat, byChatId, handleNewMessage } =
    useChatStore();
  const { selectedProductId, products } = useProductStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (suggestionsPosition === "below") return;
    if (!selectedChatId && !inputRef.current?.value) toggleSuggestions(true);
    else {
      toggleSuggestions(false);
    }
  }, [selectedChatId]);

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

    const productStory = selectedChatId
      ? byChatId[selectedChatId].productStory
      : null;

    toggleLoading(true);
    handleNewMessage({ message, chatId: selectedChatId ?? null, chatHistory });
    await upsertChat({
      message,
      chatId: selectedChatId ?? null,
      chatHistory,
      productId: selectedProductId,
      chatTitle,
      productStory,
    });
    toggleLoading(false);
  };

  const renderSuggestions = () => (
    <div className="bg-white py-3 rounded-2xl w-full flex flex-col gap-3">
      <ul
        className={clsx(
          "flex gap-2 flex-wrap",
          !showSuggestion && !showSuggestionState && "hidden"
        )}
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
        !selectedChatId &&
        renderSuggestions()}
      {showHeading && (
        <div className="text-sm -mb-2 text-brown font-bold">
          Start a New Session
        </div>
      )}
      <div className="w-full mx-auto relative">
        <textarea
          ref={inputRef}
          className="w-full rounded-xl p-4 my-3 min-h-[84px] bg-cream relative outline-none text-black"
          placeholder={`Start a session within ${
            (selectedProductId && products[selectedProductId]?.productName) ||
            "..."
          }`}
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
          className="w-8 h-8 bg-green cursor-pointer rounded-full flex justify-center items-center text-white hover:bg-green/90 absolute right-3 bottom-7 z-50 "
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
        !selectedChatId &&
        renderSuggestions()}
    </>
  );
};

export default Chatbox;
