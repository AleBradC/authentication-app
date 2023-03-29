import { UserDTO } from "./DTOs/UserDTO";
import { IUser } from "./IUser";

export interface IRepositoryLayer {
  findAll: () => Promise<UserDTO[]>;
  findOneByEmail: (email: string) => Promise<UserDTO | null>;
  findOneById: (itemId: number) => Promise<UserDTO | null>;
  createUser: (details: IUser) => Promise<UserDTO | null>;
  saveUser: (currentUser: IUser) => Promise<UserDTO | null>;
}
