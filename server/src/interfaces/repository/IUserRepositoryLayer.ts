import User from "../../models/User";
import IUser from "../base/IUser";
import UserDTO from "../DTOs/UserDTO";
export default interface IUserRepositoryLayer {
  createUser: (details: IUser) => Promise<User>;
  findAllUsers: () => Promise<UserDTO[] | null>;
  findOneById: (id: string) => Promise<UserDTO | null>;
  findOneByEmail: (email: string) => Promise<UserDTO | null>;
  findOneByUserName: (user_name: string) => Promise<UserDTO | null>;
  findAllUserDetails: (email: string) => Promise<IUser | null>;
}
