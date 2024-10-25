"use client";
import { useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import { ModalRoot } from "@/components/modal/ModalRoot";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <ModalRoot />
        <Toaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
