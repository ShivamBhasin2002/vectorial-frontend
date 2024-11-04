import { create } from "zustand";

export type sideBarStates = "Chats" | "Files" | "Transcripts" | "Description";
interface PageState {
  toggleNewProductPanelOpen: (state: boolean) => void;
  setSideBarState: (state: sideBarStates) => void;
  sideBarState: sideBarStates;
  isNewProductPanelOpen: boolean;
}

export const usePageStore = create<PageState>((set) => ({
  isNewProductPanelOpen: false,
  sideBarState: "Chats",
  toggleNewProductPanelOpen: (state) => {
    set({ isNewProductPanelOpen: state });
  },
  setSideBarState: (state) => {
    set({ sideBarState: state });
  },
}));
