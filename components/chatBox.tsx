"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoOpenSharp } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { TiAttachmentOutline } from "react-icons/ti";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "@store/chatStore";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@store/productsStore";
import { usePageStore } from "@store/pageStore";

interface ChatboxProps {
  suggestionsPosition: "above" | "below";
}

const suggestions = [
  "suggestion 1 suggestion 1 suggestion 1",
  "suggestion 2 suggestion 2 suggestion 2",
  "suggestion 3 suggestion 3 suggestion 3",
];

const Chatbox: React.FC<ChatboxProps> = ({ suggestionsPosition }) => {
  const router = useRouter();
  const [showSuggestions, toggleSuggestions] = useState(true);
  const { selectedChatId, upsertChat, byChatId, handleNewMessage, } =
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

  const handleSubmit = () => {
    const message = inputRef.current?.value;
    if (!message) return;
    const chatHistory = selectedChatId
      ? byChatId[selectedChatId].chatMessages
      : [];
    handleNewMessage({ message, chatId: selectedChatId, chatHistory });
    upsertChat({
      message,
      chatId: selectedChatId,
      chatHistory,
      productId: selectedProductId,
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const renderSuggestions = () => (
    <div
      className={clsx(
        "bg-white border-grey border-2 p-4 rounded-2xl w-[calc(100%-32px)] ml-[16px] flex flex-col gap-4 transition-transform ease-in-out relative z-0",
        suggestionsPosition === "above" ? "mb-[-50px]" : "mt-[-22px]",
        !showSuggestions &&
          (suggestionsPosition === "above"
            ? "translate-y-[148px] mt-[-120px]"
            : "translate-y-[-106px]")
      )}
    >
      <p className="font-semibold text-surface-0">
        Suggested queries to stat with:-
      </p>
      <ul className="flex gap-2">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="cursor-pointer flex-1 bg-yellow p-2 text-wrap rounded-lg text-black font-bold hover:bg-yellow/80 max-h-16 overflow-hidden line-clamp-2"
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
      <ul className="flex flex-row-reverse gap-2 ">
        <li
          className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100"
          onClick={() => {
            setSideBarState("Description");
            router.push(`/dashboard/product/${selectedProductId}`);
          }}
        >
          <IoOpenSharp />
        </li>
        <li
          className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100"
          onClick={() => {
            setSideBarState("Chats");
            router.push(`/dashboard/product/${selectedProductId}`);
          }}
        >
          <IoSend />
        </li>
        <li
          className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100"
          onClick={() => {
            setSideBarState("Files");
            router.push(`/dashboard/product/${selectedProductId}`);
          }}
        >
          <TiAttachmentOutline />
        </li>
        <li
          className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100"
          onClick={() => {
            setSideBarState("Transcripts");
            router.push(`/dashboard/product/${selectedProductId}`);
          }}
        >
          <FaFileUpload />
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full mx-auto relative">
      {suggestionsPosition === "above" && renderSuggestions()}
      <textarea
        ref={inputRef}
        className="w-full rounded-2xl p-4 min-w-[672px] min-h-[200px] bg-offwhite border-4 border-purps relative z-10 outline-none text-black"
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
          className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100 absolute right-4 bottom-4 z-50 "
          onClick={() => {
            handleSubmit();
          }}
        >
          <IoSend />
        </li>
      )}
      {suggestionsPosition === "below" && renderSuggestions()}
    </div>
  );
};

export default Chatbox;
