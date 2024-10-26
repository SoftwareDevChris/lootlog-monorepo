"use client";
import "./buttons.css";

import { useState } from "react";

import { LoadingSpinner } from "../ui/loading/spinner/LoadingSpinner";
import { logout } from "@/lib/auth";
import Button from "@mui/material/Button";

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    const res = await logout();
    if (res.ok) window.location.href = "/";
  };

  return (
    <Button
      className="border-neutral-500 text-inherit hover:bg-neutral-500"
      variant="outlined"
      onClick={handleSignOut}
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner size={24} /> : "Sign out"}
    </Button>
  );
};
