import { TArticle } from "@/types/article.types";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const getAllNewsArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/news`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting all news articles:", err);
    throw new Error("Failed to fetch all news articles");
  }
};

export const getAllReviewArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/review`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting all review articles:", err);
    throw new Error("Failed to fetch all review articles");
  }
};

export const getAllVideoArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/video`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting all video articles:", err);
    throw new Error("Failed to fetch all video articles");
  }
};

export const getAllTechArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/tech`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting all tech articles:", err);
    throw new Error("Failed to fetch all tech articles");
  }
};
