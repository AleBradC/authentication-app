import { Service, Container } from "typedi";

import { PostgressUserRepository } from "../repositories/PostgressUserRepository";
import { IUsersService } from "../interfaces/services/IUsersService";
import { IUser } from "src/interfaces/IUser";

@Service()
export class UsersService implements IUsersService {
  private repository = Container.get(PostgressUserRepository);

  createUser = async (details: IUser) => {
    return await this.repository.createUser(details);
  };

  getAllUsers = async () => {
    return await this.repository.findAllUsers();
  };

  getUserByEmail = async (email: string) => {
    return await this.repository.findOneByEmail(email);
  };

  getUserById = async (id: string) => {
    return await this.repository.findOneById(id);
  };
}
