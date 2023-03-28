export interface UserDetails {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  role?: string;
}

export interface IAuthService {
  register: (type: UserDetails) => void;
  // login: () => void;
  // logout: () => void;
}
