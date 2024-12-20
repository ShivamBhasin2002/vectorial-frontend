import { sideBarStates } from "@store/pageStore";
import clsx from "clsx";
import React from "react";

interface TabsProps {
  tabs: { type: sideBarStates; displayName: string }[];
  activeTab: string;
  onClick: (tab: string) => unknown;
}

const Tabs = ({ tabs, activeTab, onClick }: TabsProps) => {
  return (
    <ul className="flex gap-8 px-4">
      {tabs.map(({ type: tab, displayName }, idx) => (
        <li
          key={`${tab}-${idx}`}
          className={clsx(
            "h-[50px] text-xs flex items-center font-bold cursor-pointer hover:text-black",
            activeTab === tab
              ? "text-black border-b-[3px] border-green"
              : "text-brown"
          )}
          aria-current={activeTab === tab && "page"}
          onClick={() => onClick(tab)}
        >
          {displayName}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
