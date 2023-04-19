import { UserDTO } from "../DTOs/UserDTO";
import { IUser } from "../IUser";

export interface IUsersService {
  postUser: (details: IUser) => void;
  getAllUsers: () => Promise<UserDTO[]>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  getUserById: (id: string) => Promise<UserDTO | null>;
}
