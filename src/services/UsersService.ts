import { Service, Container } from "typedi";

import { PostgressUserRepository } from "../repositories/PostgressUserRepository";
import { IUsersService } from "../interfaces/IUsersService";

@Service()
export class UsersService implements IUsersService {
  private repository = Container.get(PostgressUserRepository);

  getAllUsers = async () => {
    return await this.repository.findAllUsers();
  };

  getUserById = async (id: string) => {
    return await this.repository.findOneUserById(id);
  };
}
