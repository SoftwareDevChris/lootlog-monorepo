"use client";

import { useState } from "react";

import { removeCookie } from "@/lib/auth/session";

import { Button } from "@/components/ui/button/Button";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";
import { logout } from "@/lib/auth";

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    const res = await logout();
    if (res.ok) window.location.href = "/";
  };

  return (
    <Button
      disabled={isLoading}
      aria-disabled={isLoading}
      onClick={handleSignOut}
      className="btn-outlined"
    >
      {isLoading ? <LoadingSpinner theme="orange" size="small" /> : "Sign out"}
    </Button>
  );
};
