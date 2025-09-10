import { create } from 'zustand';

interface GlobalState {
  isGlobalView: boolean;
  toggleView: () => void;
  setGlobalView: (isGlobal: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isGlobalView: false, // Default to Malaysia view
  toggleView: () => set((state) => ({ isGlobalView: !state.isGlobalView })),
  setGlobalView: (isGlobal: boolean) => set({ isGlobalView: isGlobal }),
}));
