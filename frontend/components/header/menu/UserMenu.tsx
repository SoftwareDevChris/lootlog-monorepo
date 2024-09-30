"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCookie } from "@/lib/auth/session";

import { FaUserCircle } from "react-icons/fa";

export const UserMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleMenuClick = () => {
    if (isLoggedIn) router.push("/dashboard/user");
    else router.push("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const checkSession = async () => {
        const res = await getCookie("session");

        if (res?.value) {
          setIsLoggedIn(true);
          return;
        }

        setIsLoggedIn(false);
        return;
      };

      checkSession();
    }
  }, [isLoggedIn]);

  return (
    <div className="user-menu-wrapper">
      <FaUserCircle
        size={28}
        className="cursor-pointer"
        onClick={handleMenuClick}
      />
    </div>
  );
};
