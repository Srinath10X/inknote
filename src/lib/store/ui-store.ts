import { create } from "zustand";

interface UIState {
  isNavigating: boolean;
  setIsNavigating: (isNavigating: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavigating: false,
  setIsNavigating: (isNavigating) => set({ isNavigating }),
}));
