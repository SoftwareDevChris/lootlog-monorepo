import { TArticle } from "./article.types";

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
