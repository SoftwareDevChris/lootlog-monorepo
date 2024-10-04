import { TUser } from "@/types/user.types";
import { getCookie } from "../auth/session";

export const adminGetUserById = async (userId: number) => {
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

export const updateUserAsAdmin = async (user: Partial<TUser>) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/users/update/${user.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
