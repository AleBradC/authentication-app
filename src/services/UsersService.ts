import { Service, Container } from "typedi";

import { PostgressRepository } from "../repositories/PostgressRepository";
import { IUsersService } from "../interfaces/IUsersService";

@Service()
export class UsersService implements IUsersService {
  private repository = Container.get(PostgressRepository);

  getAllUsers = async () => {
    return await this.repository.findAllUsers();
  };

  getUserById = async (id: string) => {
    return await this.repository.findOneUserById(id);
  };
}
