import { TUser } from "@/types/user.types";
import { getCookie } from "../auth/session";

export const getUserByIdAsAdmin = async (userId: number) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as TUser;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};

export const updateUser = async (user: Partial<TUser>) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/users/${user.id}`, {
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

export const deleteUser = async (userId: number) => {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
