import { TArticle } from "./article.types";

export enum UserRoleEnum {
  USER = "USER",
  AUTHOR = "AUTHOR",
  ADMIN = "ADMIN",
}

export type TUser = {
  id: number;
  email: string;
  role: UserRoleEnum;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  articles?: TArticle[] | null;
};
