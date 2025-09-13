import { create } from 'zustand';

interface GlobalState {
  isGlobalView: boolean;
  toggleView: () => void;
  setGlobalView: (isGlobal: boolean) => void;
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isGlobalView: false, // Default to Malaysia view
  toggleView: () => set((state) => ({ isGlobalView: !state.isGlobalView })),
  setGlobalView: (isGlobal: boolean) => set({ isGlobalView: isGlobal }),
  isChatOpen: false, // Default to chat closed
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));
