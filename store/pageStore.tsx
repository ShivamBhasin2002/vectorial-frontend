import { create } from "zustand";

export type sideBarStates = "Chats" | "Files" | "Transcripts" | "Description";
interface PageState {
  isNavbarOpen: boolean;
  toggleNavBar: (state: boolean) => void;
  toggleNewProductPanelOpen: (state: boolean) => void;
  setSideBarState: (state: sideBarStates) => void;
  sideBarState: sideBarStates;
  isNewProductPanelOpen: boolean;
}

export const usePageStore = create<PageState>((set) => ({
  isNavbarOpen: false,
  isNewProductPanelOpen: false,
  sideBarState: "Chats",
  toggleNavBar: (state) => {
    set({ isNavbarOpen: state });
  },
  toggleNewProductPanelOpen: (state) => {
    set({ isNewProductPanelOpen: state });
  },
  setSideBarState: (state) => {
    set({ sideBarState: state });
  },
}));
