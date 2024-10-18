import { TArticle, TCreateArticle } from "@/types/article.types";
import { getCookie } from "../auth/session";
import { resizeImageToBase64 } from "../image";

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

const articleToFormData = async (data: TCreateArticle) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("subtitle", data.subtitle);
  formData.append("body", data.body);
  formData.append("categoryId", data.categoryId.toString());

  if (data.youtubeVideoId) {
    formData.append("youtubeVideoId", data.youtubeVideoId.toString());
  }

  if (data.image && data.image[0]) {
    const imageAsBase64 = await resizeImageToBase64(data.image[0]);

    if (imageAsBase64) {
      formData.append("imageBase64", imageAsBase64);
      formData.append("imageName", data.image[0].name);
      formData.append("imageSize", data.image[0].size.toString());
      formData.append("imageType", data.image[0].type);
      formData.append(
        "imageLastModified",
        data.image[0].lastModified.toString()
      );
    }
  }

  return formData;
};

const articleToJson = async (data: TCreateArticle) => {
  let imageObject = {
    base64: "",
    name: "",
    size: "",
    type: "",
    lastModified: "",
  };

  if (data.image && data.image[0]) {
    const imageAsBase64 = await resizeImageToBase64(data.image[0]);

    if (imageAsBase64) {
      imageObject = {
        base64: imageAsBase64,
        name: data.image[0].name,
        size: data.image[0].size.toString(),
        type: data.image[0].type,
        lastModified: data.image[0].lastModified.toString(),
      };
    }
  }

  const payload = {
    title: data.title,
    subtitle: data.subtitle,
    body: data.body,
    categoryId: data.categoryId,
    image: imageObject,
    youtubeVideoId: data.youtubeVideoId,
  };

  return JSON.stringify(payload);
};

export const createArticle = async (data: TCreateArticle) => {
  const cookie = await getCookie("session");
  if (!cookie?.value) return null;

  try {
    const article = await articleToJson(data);

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
