import { UserRoleEnum } from "./user.types";

export type TUserJwtCookie = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRoleEnum;
    iat: number;
    exp: number;
  };
};
