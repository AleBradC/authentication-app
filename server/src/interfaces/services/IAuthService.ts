import IUser from "../base/IUser";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthService {
  register: (data: IUser) => Promise<string | null>;
  login: (data: IUserLogin) => Promise<string | null>;
}
