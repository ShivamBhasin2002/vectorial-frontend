"use client";
import clsx from "clsx";
import { useRef, useState } from "react";
import { IoOpenSharp } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { TiAttachmentOutline } from "react-icons/ti";

interface ChatboxProps {
  suggestionsPosition: "above" | "below";
}

const suggestions = [
  "suggestion 1 suggestion 1 suggestion 1",
  "suggestion 2 suggestion 2 suggestion 2",
  "suggestion 3 suggestion 3 suggestion 3",
];

const Chatbox: React.FC<ChatboxProps> = ({ suggestionsPosition }) => {
  const [showSuggestions, toggleSuggestions] = useState(true);
  const ref = useRef<HTMLTextAreaElement>(null);
  const renderSuggestions = () => (
    <div
      className={clsx(
        "bg-primary-100 p-4 rounded-2xl w-[calc(100%-32px)] ml-[16px] flex flex-col gap-2 transition-transform ease-in-out relative z-0",
        suggestionsPosition === "above" ? "mb-[-20px]" : "mt-[-20px]",
        !showSuggestions &&
          (suggestionsPosition === "above"
            ? "translate-y-[168px]"
            : "translate-y-[-98px]")
      )}
    >
      <p className="font-semibold text-surface-0">
        Suggested queries to stat with:-
      </p>
      <ul className="flex gap-2">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="cursor-pointer flex-1 bg-primary-60 p-2 text-wrap rounded-lg text-white hover:bg-primary-40 max-h-16"
            onClick={() => {
              const inputRef = ref.current;
              if (!inputRef) return;
              inputRef.value = suggestion;
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
      <ul className="flex flex-row-reverse gap-2 ">
        <li className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100">
          <IoOpenSharp />
        </li>
        <li className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100">
          <TiAttachmentOutline />
        </li>
        <li className="w-8 h-8 bg-surface-0 cursor-pointer rounded-lg flex justify-center items-center text-white hover:text-primary-100">
          <FaFileUpload />
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full mx-auto">
      {suggestionsPosition === "above" && renderSuggestions()}
      <textarea
        ref={ref}
        className="w-full rounded-2xl p-4 min-w-[672px] min-h-[200px] bg-surface-20 relative z-10 outline-none"
        placeholder="Message to Vectorial AI Agent regarding Product"
        onChange={(e) => {
          if (!e.target.value) toggleSuggestions(true);
          else toggleSuggestions(false);
        }}
      />
      {suggestionsPosition === "below" && renderSuggestions()}
    </div>
  );
};

export default Chatbox;
