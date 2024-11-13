"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoOpenSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "@store/chatStore";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@store/productsStore";
import { usePageStore } from "@store/pageStore";
import { FaSpinner } from "react-icons/fa";

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
  const router = useRouter();
  const [showSuggestions, toggleSuggestions] = useState(true);
  const [showLoading, toggleLoading] = useState(false);
  const { selectedChatId, upsertChat, byChatId, handleNewMessage } =
    useChatStore();
  const { selectedProductId } = useProductStore();
  const { setSideBarState } = usePageStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { chatId } = useParams();

  useEffect(() => {
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
    toggleLoading(true);
    handleNewMessage({ message, chatId: selectedChatId, chatHistory });
    await upsertChat({
      message,
      chatId: selectedChatId,
      chatHistory,
      productId: selectedProductId,
    });
    toggleLoading(false);
  };

  const renderSuggestions = () => (
    <div
      className={clsx(
        "bg-white border-grey border-2 p-4 rounded-2xl w-[calc(100%-32px)] ml-[16px] flex flex-col gap-4  ease-in-out relative z-0",
        suggestionsPosition === "above" ? "mb-[-50px]" : "mt-[-22px]",
        !showSuggestions && suggestionsPosition === "above" && "hidden"
      )}
    >
      <p
        className={clsx(
          "font-semibold text-black",
          !showSuggestions && "hidden"
        )}
      >
        Suggested queries to start with:-
      </p>
      <ul
        className={clsx("flex gap-2 flex-wrap", !showSuggestions && "hidden")}
      >
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="cursor-pointer bg-cream p-2 px-4 whitespace-nowrap rounded-2xl text-black"
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
      <ul
        className={clsx(
          "flex flex-row-reverse gap-2 ",
          !showSuggestions && "mt-4"
        )}
      >
        <li
          className="w-8 h-8 bg-green cursor-pointer rounded-lg flex justify-center items-center text-white hover:bg-green/90"
          onClick={() => {
            setSideBarState("Description");
            router.push(`/dashboard/product/${selectedProductId}`);
          }}
        >
          <IoOpenSharp />
        </li>
        <li
          className="w-8 h-8 bg-green cursor-pointer rounded-lg flex justify-center items-center text-white hover:bg-green/90"
          onClick={() => {
            setSideBarState("Chats");
            router.push(`/dashboard/product/${selectedProductId}`);
          }}
        >
          {showLoading ? (
            <FaSpinner className="text-xl animate-spin text-white" />
          ) : (
            <IoSend />
          )}
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full mx-auto relative">
      {suggestionsPosition === "above" && renderSuggestions()}
      <textarea
        ref={inputRef}
        className="w-full rounded-2xl p-4 min-w-[672px] min-h-[100px] bg-cream border border-brown relative z-10 outline-none text-black"
        placeholder="Message to Vectorial AI Agent regarding Product"
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          handleSubmit();
        }}
        onChange={(e) => {
          if (!e.target.value && !selectedChatId) toggleSuggestions(true);
          else toggleSuggestions(false);
        }}
      />
      {suggestionsPosition === "above" && (
        <li
          className="w-8 h-8 bg-green cursor-pointer rounded-lg flex justify-center items-center text-white hover:bg-green/90 absolute right-4 bottom-4 z-50 "
          onClick={() => {
            handleSubmit();
          }}
        >
          {showLoading ? (
            <FaSpinner className="text-xl animate-spin text-white" />
          ) : (
            <IoSend />
          )}
        </li>
      )}
      {suggestionsPosition === "below" && renderSuggestions()}
    </div>
  );
};

export default Chatbox;
