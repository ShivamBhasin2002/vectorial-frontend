import { create } from "zustand";

interface PageState {
  isNavbarOpen: boolean;
  toggleNavBar: (state: boolean) => void;
}

export const usePageStore = create<PageState>((set) => ({
  isNavbarOpen: false,
  toggleNavBar: (state) => {
    set({ isNavbarOpen: state });
  },
}));
