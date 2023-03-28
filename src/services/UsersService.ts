import { Service, Container } from "typedi";
import "reflect-metadata";

import { PostgressRepository } from "../repositories/PostgressRepository";
import { IUsersService } from "../interfaces/IUsersService";

@Service()
export class UsersService implements IUsersService {
  private repository = Container.get(PostgressRepository);

  getAllUsers = async () => {
    return await this.repository.findAll();
  };
}
