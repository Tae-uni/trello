// This code runs on the client side
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams(); // Get URL parameters
  const { setActive } = useOrganizationList(); // Get the setActive function from Clerk

  useEffect(() => {
    if (!setActive) return; // If setActive is not defined, do nothing

    setActive({
      // Activate the organization using the organizationId from the URL
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]); // Re-run this effect when setActive or organizationId changes

  return null;
};