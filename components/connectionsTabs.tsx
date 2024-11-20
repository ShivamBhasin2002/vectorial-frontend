"use client";
import VectorialLogo from "@assets/icons/vectorialLogo";
import { ReactNode, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRightLeft } from "react-icons/fa6";

export const ConnectionTab = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  const [isIntegrated, toggleIntegrate] = useState(
    localStorage.getItem(title) === "true"
  );
  const [showIntegrationModal, toggleIntegrationModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className=" flex flex-col gap-4 bg-cream border border-brown rounded-xl p-4 shadow-xl flex-1 max-w-[calc((100%-2rem)/3)]">
        <div className="flex gap-4 font-bold text-xl items-center">
          {icon}
          <div>{title}</div>
        </div>
        <div className="text-sm">{description}</div>
        <button
          className="focus:outline-none hover:bg-green/80 flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-green text-white h-10 mt-auto overflow-hidden hover:scale-[0.98] transition-all"
          disabled={isIntegrated}
          onClick={() => {
            if (isIntegrated) return;
            toggleIntegrationModal(true);
          }}
        >
          {!isIntegrated && <FaPlus />}
          <div className="whitespace-nowrap font-bold">
            {isIntegrated
              ? "You are successfully integrated"
              : `Integrate with ${title}`}
          </div>
        </button>
      </div>
      {showIntegrationModal && (
        <div
          className="flex fixed top-0 bottom-0 left-0 right-0 bg-borderGray/50 justify-center items-center"
          onClick={(e) => {
            if (modalRef.current && modalRef.current.contains(e.target as Node))
              return;
            toggleIntegrationModal(false);
          }}
        >
          <div
            className=" flex flex-col gap-4 bg-cream border border-brown rounded-xl p-4 shadow-xl flex-1 max-w-[calc((100%-2rem)/3)]"
            ref={modalRef}
          >
            <div className="flex gap-4 font-bold text-3xl items-center justify-center">
              {icon}
              <FaRightLeft className="text-sm" />
              <VectorialLogo width={30} height={30} />
            </div>
            <div className="text-lg text-center ">
              <strong>Vectorial AI</strong> is requesting to access the accounts{" "}
              <strong>{title} workspace</strong>
            </div>
            <button
              className="focus:outline-none hover:bg-green/80 flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-green text-white h-10 mt-auto overflow-hidden hover:scale-[0.98] transition-all"
              onClick={() => {
                toggleIntegrationModal(false);
                toggleIntegrate(true);
                localStorage.setItem(title, "true");
              }}
            >
              <div className="whitespace-nowrap font-bold">
                Confrim integration with {title}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
