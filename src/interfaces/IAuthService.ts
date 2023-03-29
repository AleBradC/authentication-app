export interface IUserDetails {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  role?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthService {
  register: (data: IUserDetails) => void;
  login: (data: IUserLogin) => void;
  // logout: () => void;
}
