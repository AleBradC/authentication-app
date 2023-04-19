import IUser from "../base/IUser";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserToken {
  accessToken: string;
}

export interface IAuthService {
  register: (data: IUser) => Promise<IUserToken | string | null>;
  login: (data: IUserLogin) => Promise<IUserToken | string | null>;
  // logout: () => void;
}
