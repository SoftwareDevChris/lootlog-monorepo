import {
  TArticle,
  TCreateArticle,
  TUpdateArticle,
  TImage,
} from "@/types/article.types";
import { resizeImageToBase64 } from "../image";

export const getAllArticles = async () => {
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

export const getFrontpageArticles = async () => {
  try {
    const res = await fetch(`/api/articles/frontpage`, {
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

export const getArticlesByUser = async () => {
  try {
    const res = await fetch(`/api/articles/user`, {
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
    const res = await fetch(`/api/articles/${articleId}`, {
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

const createArticleToJson = async (data: TCreateArticle) => {
  let imageObject = {
    name: "",
    type: "",
    size: "",
    base64: "",
  };

  if (data.image && data.image[0]) {
    const imageAsBase64 = await resizeImageToBase64(data.image[0]);

    if (imageAsBase64) {
      imageObject = {
        base64: imageAsBase64,
        name: data.image[0].name,
        size: data.image[0].size.toString(),
        type: data.image[0].type,
      };
    }
  }

  const payload = {
    title: data.title,
    body: data.body,
    categoryId: data.categoryId,
    image: imageObject,
    youtubeVideoId: data.YTVideoId,
  };

  return JSON.stringify(payload);
};

export const createArticle = async (data: TCreateArticle) => {
  try {
    const article = await createArticleToJson(data);

    const res = await fetch(`/api/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: article,
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
    const res = await fetch(`/api/articles/${beforeEdit.id}`, {
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
