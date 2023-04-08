import { UserDTO } from "../DTOs/UserDTO";
import { IUser } from "../IUser";

export interface IUserRepositoryLayer {
  findAllUsers: () => Promise<UserDTO[]>;
  findOneUserById: (itemId: string) => Promise<UserDTO | null>;
  findOneUserByEmail: (email: string) => Promise<UserDTO | null>; // 2 in 1 ?
  createUser: (details: IUser) => Promise<UserDTO | null>;
  saveUser: (currentUser: IUser) => Promise<UserDTO | null>;
}
