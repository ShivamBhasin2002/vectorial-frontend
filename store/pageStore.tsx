import { create } from "zustand";

export type sideBarStates = "Chats" | "Files" | "Transcripts" | "Description";
interface PageState {
  isNavbarOpen: boolean;
  toggleNavBar: (state: boolean) => void;
  setSideBarState: (state: sideBarStates) => void;
  sideBarState: sideBarStates;
}

export const usePageStore = create<PageState>((set) => ({
  isNavbarOpen: false,
  sideBarState: "Chats",
  toggleNavBar: (state) => {
    set({ isNavbarOpen: state });
  },
  setSideBarState: (state) => {
    set({ sideBarState: state });
  },
}));
