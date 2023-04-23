import { Service, Container } from "typedi";

import PostgressUserRepository from "../repositories/PostgressUserRepository";
import IUsersService from "../interfaces/services/IUsersService";
import IUser from "../interfaces/base/IUser";
import UserDTO from "../interfaces/DTOs/UserDTO";
@Service()
export default class UsersService implements IUsersService {
  private repository;

  constructor() {
    this.repository = Container.get(PostgressUserRepository);
  }

  postUser = async (details: IUser) => {
    return await this.repository.createUser(details);
  };

  getAllUsers = async (): Promise<UserDTO[]> => {
    return await this.repository.findAllUsers();
  };

  getUserByEmail = async (email: string): Promise<UserDTO | null> => {
    return await this.repository.findOneByEmail(email);
  };

  getUserByUserName = async (user_name: string): Promise<UserDTO | null> => {
    return await this.repository.findOneByUserName(user_name);
  };

  getUserById = async (id: string): Promise<UserDTO | null> => {
    return await this.repository.findOneById(id);
  };

  getAllUsersDetails = async (email: string): Promise<IUser | null> => {
    return await this.repository.findAllUserDetails(email);
  };
}
