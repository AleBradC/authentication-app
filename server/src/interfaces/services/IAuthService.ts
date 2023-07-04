import IUser from "../base/IUser";
import { IAuthResponse } from "./IAuthResponse";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthService {
  register: (data: IUser) => Promise<IAuthResponse | null>;
  login: (data: IUserLogin) => Promise<IAuthResponse | string | null>;
}
