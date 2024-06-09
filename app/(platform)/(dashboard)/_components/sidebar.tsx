"use client"; // Client side code

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string; // Optional storage key for local storage
}

export const Sidebar = ({
  storageKey = "sidebar-state", // Default storage key
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {} // Default state is an empty object
  );
  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg
  } = useOrganization(); // Get active organization info and loading state

  const {
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList({
    userMemberships: {
      infinite: true, // Infinite loading for user memberships
    },
  });

  // { "123": true } => ["123"]
  // Calculate the default expanded accordion items based on the local storage state
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      // If the item is expanded (value is true), add the key to the accumulator array
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    }, []);

  // Handle the expansion and collapse of accordion items
  const onExpand = (id: string) => {
    // Update the expanded state and local storage
    setExpanded((curr) => ({
      ...curr, // Preserve the current state
      [id]: !expanded[id], // Toggle the expanded state of the specified item
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">
          Workspaces
        </span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus 
              className="h-4 w-4"
            />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};