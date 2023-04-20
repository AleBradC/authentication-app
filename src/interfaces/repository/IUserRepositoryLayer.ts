import IUser from "../base/IUser";
import UserDTO from "../DTOs/UserDTO";
export default interface IUserRepositoryLayer {
  createUser: (details: IUser) => void;
  findAllUsers: () => Promise<UserDTO[]>;
  findOneById: (id: string) => Promise<UserDTO | null>;
  findOneByEmail: (email: string) => Promise<UserDTO | null>;
  findAllUserDetails: (email: string) => Promise<IUser | null>;
}
