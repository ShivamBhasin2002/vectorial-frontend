import clsx from "clsx";
import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tab: string) => unknown;
}

const Tabs = ({ tabs, activeTab, onClick }: TabsProps) => {
  return (
    <ul className="hidden text-sm font-medium text-center rounded-lg shadow sm:flex divide-gray-700 text-black  overflow-hidden">
      {tabs.map((tab, idx) => (
        <li
          key={`${tab}-${idx}`}
          className={clsx(
            "inline-block w-full p-4 focus:ring-4e focus:outline-none bg-grey hover:bg-yellow focus-within:z-10 cursor-pointer font-semibold",
            activeTab === tab &&
              "active text-black bg-yellow font-extrabold hover:bg-darkGrey"
          )}
          aria-current={activeTab === tab && "page"}
          onClick={() => onClick(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
