import { TUser } from "./user.types";

export type TCreateArticle = {
  title: string;
  subtitle: string;
  body: string;
  categoryId: number;
  image?: FileList | null;
  YTVideoId?: string;
};

export type TUpdateArticle = {
  title: string;
  subtitle: string;
  body: string;
  categoryId: number;
  image?: TImage | null;
  YTVideoId?: string;

  isPublic: boolean;
  isFeatured: boolean;
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
  YTVideoId?: string;
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
  size: number;
  url: string;
  lastModified: string;
};
