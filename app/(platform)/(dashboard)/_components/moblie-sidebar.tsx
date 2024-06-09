// Moblie Sidebar
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { useMoblieSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Sidebar } from "./sidebar";

// Main Mobile Sidebar Component
export const MoblieSidebar = () => {
  const pathname = usePathname(); // Get the current pathname from Next.js
  const [ isMounted, setIsMounted ] = useState(false); // State to check if component is mounted

  // From hooks/use-moblie-sidebar.ts
  const onOpen = useMoblieSidebar((state) => state.onOpen);
  const onClose = useMoblieSidebar((state) => state.onClose);
  const isOpen = useMoblieSidebar((state) => state.isOpen);

  // Set isMounted to true when the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Whenever RUL Changes, MobileSidebar will close
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }


  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      {/* Sidebar's container, manage the open/close status */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        {/* The SheetContent component holds the actual content of the sidebar */}
        <SheetContent side="left" className="p-2 pt-10">
          {/* Real sidebar's contents */}
          <Sidebar 
            storageKey="sidebar-mobile-state"
          />
        </SheetContent>
      </Sheet>
    </>
  );
};