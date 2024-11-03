import { TCategory } from "@/types/article.types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  try {
    const res = await fetch(`${apiUrl}/categories`, {
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
  try {
    const res = await fetch(`${apiUrl}/categories/${id}`, {
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
  try {
    const res = await fetch(`${apiUrl}/categories`, {
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
  try {
    const res = await fetch(`${apiUrl}/categories/${body.id}`, {
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
