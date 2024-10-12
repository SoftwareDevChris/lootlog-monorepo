import { TArticle } from "@/types/article.types";
import { getCookie } from "../auth/session";

export const getAllArticles = async () => {
  const cookie = await getCookie("session");
  if (!cookie?.value) return null;

  try {
    const res = await fetch(`/api/articles`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) return (await res.json()) as TArticle[];
    else return null;
  } catch (error) {
    console.error("Error getting articles:", error);
    return null;
  }
};

const prepareArticleData = async (data: Partial<TArticle>) => {
  const title = data.title?.toLowerCase();
  const subtitle = data.subtitle?.toLowerCase();
  const categoryId = data.category?.id;
  const image = data.image?.[0];
  const body = data.body;

  return {
    title,
    subtitle,
    categoryId,
    image,
    body,
  };
};

export const createArticle = async (data: Partial<TArticle>) => {
  const cookie = await getCookie("session");
  if (!cookie?.value) return null;

  try {
    const formatted = await prepareArticleData(data);

    const res = await fetch(`/api/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatted),
    });

    return res;
  } catch (err) {
    console.error("Error creating article:", err);
    return null;
  }
};
