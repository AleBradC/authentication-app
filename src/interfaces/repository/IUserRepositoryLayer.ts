import { UserDTO } from "../DTOs/UserDTO";
import { IUser } from "../IUser";

export interface IUserRepositoryLayer {
  createUser: (details: IUser) => void;
  findAllUsers: () => Promise<UserDTO[]>;
  findOneByEmail: (email: string) => Promise<UserDTO | null>;
  findOneById: (id: string) => Promise<UserDTO | null>;
}
