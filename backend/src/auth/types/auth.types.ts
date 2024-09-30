export type TLoginCredentials = {
  email: string;
  password: string;
};

export interface IUserToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
