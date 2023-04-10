import { Service, Container } from "typedi";

import { PostgressUserRepository } from "../repositories/PostgressUserRepository";
import { IUsersService } from "../interfaces/services/IUsersService";

@Service()
export class UsersService implements IUsersService {
  private repository = Container.get(PostgressUserRepository);

  getAllUsers = async () => {
    return await this.repository.findAllUsers();
  };

  getUser = async (id: string) => {
    return await this.repository.findOneById(id);
  };
}
