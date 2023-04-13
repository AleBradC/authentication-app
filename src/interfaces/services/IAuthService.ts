export interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserToken {
  accessToken: string;
}

export interface IAuthService {
  register: (data: IUserDetails) => Promise<IUserToken | string | null>;
  login: (data: IUserLogin) => Promise<IUserToken | string | null>;
  // logout: () => void;
}