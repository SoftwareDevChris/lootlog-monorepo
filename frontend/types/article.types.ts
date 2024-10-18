import { TUser } from "./user.types";

export type TCreateArticle = {
  title: string;
  subtitle: string;
  body: string;
  categoryId: number;
  image?: FileList | null;
  youtubeVideoId?: string;
};

export type TArticle = {
  id: number;
  createdAt: Date;
  title: string;
  subtitle: string;
  body: string;

  isPublic: boolean;
  isFeatured: boolean;

  categoryId: number;
  authorId: number;

  image?: TImage | null;
  author?: TUser;
  category?: TCategory;
  youtubeVideoId?: string;
};

export type TCategory = {
  id: number;
  name: string;
  articles?: TArticle[] | null;
};

export type TImage = {
  id: number;
  name: string;
  type: string;
  base64: string;
  articleId: number;
};
