import { TUser } from "@/types/user.types";
import { getCookie } from "../auth/session";

export const getUserById = async (userId: number) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/users/find/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as TUser;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};
