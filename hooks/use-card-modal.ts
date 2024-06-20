import { create } from "zustand";

// Define the type for the MobileSidebarStore
type CardModalStore = {
  id?: string;
  isOpen: boolean; // State to check if the sidebar is open
  onOpen: (id: string) => void; // Open the sidebar
  onClose: () => void; // Close the sidebar
};

// Create the zustand store for the mobile sidebar
export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false, // Initial state: sidebar is closed
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));