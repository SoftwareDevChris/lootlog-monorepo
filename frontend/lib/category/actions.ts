import { TCategory } from "@/types/article.types";

const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SERVER;

export async function getCategories() {
  try {
    const res = await fetch(`${serverUrl}/api/categories`, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as TCategory[];
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
}
