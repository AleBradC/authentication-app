import { IUser } from "../IUser";

export interface IUserRepositoryLayer {
  findAllUsers: () => any;
  findOneById: (id: string) => any;
  findOneByEmail: (email: string) => any;
  createUser: (details: IUser) => any;
}
