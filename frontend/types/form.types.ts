import { TArticle } from "./article.types";
import { UserRoleEnum } from "./user.types";

export type TLoginForm = {
  email: string;
  password: string;
};

export type TCreateUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

export type TUpdateUserForm = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRoleEnum;
  articles?: TArticle[];
};
