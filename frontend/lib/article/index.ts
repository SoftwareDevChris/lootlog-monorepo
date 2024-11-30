import {
  TArticle,
  TCreateArticle,
  TUpdateArticle,
} from "@/types/article.types";
import { convertCanvasToBlob, resizeImage } from "../image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles`, {
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

export const getFrontpageArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/frontpage`, {
      method: "GET",
    });
    if (res.ok)
      return (await res.json()) as {
        featured: TArticle;
        news: TArticle[];
        reviews: TArticle[];
      };
  } catch (err) {
    console.log("Error getting other frontpage articles:", err);
    throw new Error("Failed to fetch frontpage articles");
  }
};

export const getFrontpageFeaturedArticle = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/frontpage/featured`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle;
  } catch (err) {
    console.log("Error getting frontpage featured article:", err);
    throw new Error("Failed to fetch frontpage featured article");
  }
};

export const getFrontpageNewsArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/frontpage/news`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting frontpage news articles:", err);
    throw new Error("Failed to fetch frontpage news articles");
  }
};

export const getFrontpageReviewArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/frontpage/review`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting frontpage review articles:", err);
    throw new Error("Failed to fetch frontpage review articles");
  }
};

export const getFrontpageVideoArticle = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/frontpage/video`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle;
  } catch (err) {
    console.log("Error getting frontpage video articles:", err);
    throw new Error("Failed to fetch frontpage video articles");
  }
};

export const getFrontpageTechArticles = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/frontpage/tech`, {
      method: "GET",
    });
    if (res.ok) return (await res.json()) as TArticle[];
  } catch (err) {
    console.log("Error getting frontpage review articles:", err);
    throw new Error("Failed to fetch frontpage review articles");
  }
};

export const getArticlesByUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/articles/user`, {
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

export const getArticleById = async (articleId: string) => {
  try {
    const res = await fetch(`${apiUrl}/articles/${articleId}`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) return (await res.json()) as TArticle;
    else return null;
  } catch (error) {
    console.error("Error getting articles:", error);
    return null;
  }
};

const newArticleToFormData = async (data: TCreateArticle) => {
  const formData = new FormData();

  if (data.image && data.image[0]) {
    const imageFile = data.image[0];
    const canvas = await resizeImage(data.image[0]);

    if (canvas) {
      const blob = await convertCanvasToBlob(
        canvas,
        imageFile.type,
        imageFile.name,
      );
      if (blob) formData.append("image", blob);
    }
  }

  if (data.YTVideoId) formData.append("YTVideoId", data.YTVideoId);

  formData.append("title", data.title);
  formData.append("body", data.body);
  formData.append("categoryId", data.categoryId.toString());

  return formData;
};

export const createArticle = async (data: TCreateArticle) => {
  try {
    const formData = await newArticleToFormData(data);

    const res = await fetch(`${apiUrl}/articles`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    return res;
  } catch (err) {
    console.error("Error creating article:", err);
    return null;
  }
};

// Needs type gymnastics to recognize if a new image has been chosen or not

// const updateArticleToJson = async (
//   beforeEdit: TArticle,
//   afterEdit: TUpdateArticle
// ) => {
//   let imageObject = beforeEdit.image;

//   if (beforeEdit.image !== afterEdit.image) {
//     // New image has been chosen for the article
//     if (!afterEdit.image) return;

//     const imageAsBase64 = await resizeImageToBase64(afterEdit.image);

//     if (imageAsBase64) {
//       imageObject = {
//         base64: imageAsBase64,
//         name: data.image[0].name,
//         size: data.image[0].size.toString(),
//         type: data.image[0].type,
//       };
//     }
//   }

//   const payload = {
//     title: data.title,
//     subtitle: data.subtitle,
//     body: data.body,
//     categoryId: data.categoryId,
//     image: imageObject,
//     youtubeVideoId: data.YTVideoId,
//   };

//   return JSON.stringify(payload);
// };

export const updateArticle = async (
  beforeEdit: TArticle,
  afterEdit: TUpdateArticle,
) => {
  // TODO: Implement change image
  const article: TArticle = {
    id: beforeEdit.id,
    title: afterEdit.title,
    body: afterEdit.body,
    image: afterEdit.image,
    author: beforeEdit.author,
    createdAt: beforeEdit.createdAt,
    isPublic: afterEdit.isPublic,
    isFeatured: afterEdit.isFeatured,
    YTVideoId: afterEdit.YTVideoId,
    categoryId: afterEdit.categoryId,
  };

  try {
    const res = await fetch(`${apiUrl}/articles/${beforeEdit.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });

    return res;
  } catch (err) {
    console.error("Error creating article:", err);
    return null;
  }
};

export const deleteArticle = async (articleId: number) => {
  try {
    const res = await fetch(`${apiUrl}/articles/${articleId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (err) {
    console.error("Error deleting article:", err);
    return null;
  }
};
