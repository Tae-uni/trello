import { create } from "zustand";

// Define the type for the MobileSidebarStore
type MobileSidebarStore = {
  isOpen: boolean; // State to check if the sidebar is open
  onOpen: () => void; // Open the sidebar
  onClose: () => void; // Close the sidebar
};

// Create the zustand store for the mobile sidebar
export const useMoblieSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false, // Initial state: sidebar is closed
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));