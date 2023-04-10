import { UserDTO } from "../DTOs/UserDTO";
import { IUser } from "../IUser";

export interface IUserRepositoryLayer {
  findAllUsers: () => any;
  findOneUserById: (itemId: string) => any;
  findOneUserByEmail: (email: string) => any;
  createUser: (details: IUser) => any;
}
