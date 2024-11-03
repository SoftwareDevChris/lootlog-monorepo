import { TUser } from "@/types/user.types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUserByIdAsAdmin = async (userId: number) => {
  try {
    const res = await fetch(`${apiUrl}/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as TUser;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/users/whoami`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (res.ok) return (await res.json()) as TUser;
    else return null;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error("No user details were found");
  }
};

export const updateUser = async (user: Partial<TUser>) => {
  try {
    const res = await fetch(`${apiUrl}/users/${user.id}`, {
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
  try {
    const res = await fetch(`${apiUrl}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
