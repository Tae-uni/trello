"use client";
// React Query is a powerful library for managing server state, enabling efficient data fetching, caching, sync, and updates within a React app.
// Particularly useful that frequently interact with APIs.

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const QueryProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient);

  return (
    // Provide the QueryClient to the rest of the application
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};