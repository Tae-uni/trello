"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "@/components/modals/pro-modal";

export const ModalProvider = () => {
  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Effect to set the state to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted, render nothing
  if (!isMounted) {
    return null;
  }

  // Once mounted, render the CardModal component
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};