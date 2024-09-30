"use client";

import { Button } from "@/components/ui/button/Button";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";
import { removeCookie } from "@/lib/auth/session";
import { useUserStore } from "@/store/user-store";
import { useState } from "react";

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setIsLoggedIn = useUserStore().setIsLoggedIn;

  const handleSignOut = async () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    await removeCookie("session");
    await removeCookie("refresh");
    return;
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
