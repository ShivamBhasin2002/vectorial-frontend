import React from "react";
import { sideBarStates, usePageStore } from "@store/pageStore";
import Tabs from "@components/tabs";
import { ChatsListing } from "./chatsListing";
import { FilesListing } from "./fileListing";

export const SideBar = () => {
  const { sideBarState, setSideBarState } = usePageStore();
  const sideBarTabs: sideBarStates[] = [
    "Chats",
    "Files",
    "Transcripts",
    "Description",
  ];
  const onClick = (tab: string) => {
    setSideBarState(tab as sideBarStates);
  };
  return (
    <div className="w-[26%] min-h-full bg-mixed-20 rounded-2xl p-4 flex flex-col gap-4 overflow-hidden">
      <Tabs tabs={sideBarTabs} activeTab={sideBarState} onClick={onClick} />
      {sideBarState === "Chats" && <ChatsListing />}
      {sideBarState === "Files" && <FilesListing fileType="Files" />}
      {sideBarState === "Transcripts" && <FilesListing fileType="Transcripts" />}
    </div>
  );
};
