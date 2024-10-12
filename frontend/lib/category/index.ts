import { TCategory } from "@/types/article.types";
import { getCookie } from "../auth/session";

export async function getCategories() {
  try {
    const res = await fetch(`/api/categories`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) return (await res.json()) as TCategory[];
    else return null;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
}

export async function getCategoryById(id: number) {
  const cookie = await getCookie("session");
  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      return (await res.json()) as TCategory;
    }
  } catch (err) {
    console.error("Error getting category:", err);
    return null;
  }
}

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

    return res;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
}

export async function updateCategory(body: TCategory) {
  const cookie = await getCookie("session");
  if (!cookie?.value || !body.id) return null;

  try {
    const res = await fetch(`/api/categories/${body.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
}
