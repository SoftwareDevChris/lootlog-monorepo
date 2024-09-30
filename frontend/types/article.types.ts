import { TUser } from "./user.types";

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
  url: string;
  articleId: number;
};
