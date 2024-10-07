import { TCategory } from "@/types/article.types";
import { getCookie } from "../auth/session";

export async function createCategory(body: Partial<TCategory>) {
  const cookie = await getCookie("session");

  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/categories`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
}
