import clsx from "clsx";
import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onClick: (tab: string) => unknown;
}

const Tabs = ({ tabs, activeTab, onClick }: TabsProps) => {
  return (
    <ul className="hidden text-sm font-medium text-center rounded-lg shadow sm:flex divide-gray-700 text-primary-100  overflow-hidden">
      {tabs.map((tab, idx) => (
        <li
          key={`${tab}-${idx}`}
          className={clsx(
            "inline-block w-full p-4 focus:ring-4e focus:outline-none bg-mixed-40 hover:bg-primary-80 hover:text-white focus-within:z-10 cursor-pointer font-semibold",
            activeTab === tab &&
              "active text-white bg-primary-80 hover:bg-primary-60"
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
