import { User } from "../dataBase/entities/User";
import { IUser } from "./IUser";

export interface IRepositoryLayer {
  findAll: () => void;
  findOneByEmail: (email: string) => Promise<User | null>;
  createUser: (details: IUser) => Promise<User>;
  saveUser: (currentUser: IUser) => Promise<User | null>;
}
export { IUser };
