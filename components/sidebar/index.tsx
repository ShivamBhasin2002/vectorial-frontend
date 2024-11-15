import React from "react";
import { sideBarStates, usePageStore } from "@store/pageStore";
import Tabs from "@components/tabs";
import { ChatsListing } from "./chatsListing";
import { FilesListing } from "./fileListing";
import Description from "./description";

export const SideBar = () => {
  const { sideBarState, setSideBarState } = usePageStore();
  const sideBarTabs: { type: sideBarStates; displayName: string }[] = [
    { type: "Chats", displayName: "Sessions" },
    { type: "Files", displayName: "Sources" },
    { type: "Transcripts", displayName: "Transcripts" },
    { type: "Description", displayName: "Description" },
  ];
  const onClick = (tab: string) => {
    setSideBarState(tab as sideBarStates);
  };
  return (
    <div className="w-[386px] min-h-full fixed right-0 top-0 bottom-0 bg-cream p-4 flex flex-col gap-4 overflow-hidden shadow-md">
      <Tabs tabs={sideBarTabs} activeTab={sideBarState} onClick={onClick} />
      {sideBarState === "Chats" && <ChatsListing />}
      {sideBarState === "Files" && <FilesListing fileType="Files" />}
      {sideBarState === "Transcripts" && (
        <FilesListing fileType="Transcripts" />
      )}
      {sideBarState === "Description" && <Description />}
    </div>
  );
};
