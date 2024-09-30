"use client";
import { useEffect, useState } from "react";

import { getCookie, removeCookie } from "@/lib/auth/session";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user-store";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
