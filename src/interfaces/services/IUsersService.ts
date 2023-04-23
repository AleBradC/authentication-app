import IUser from "../base/IUser";
import UserDTO from "../DTOs/UserDTO";
export default interface IUsersService {
  postUser: (details: IUser) => void;
  getAllUsers: () => Promise<UserDTO[]>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  getUserByUserName: (user_name: string) => Promise<UserDTO | null>;
  getUserById: (id: string) => Promise<UserDTO | null>;
  getAllUsersDetails: (email: string) => Promise<IUser | null>;
}
