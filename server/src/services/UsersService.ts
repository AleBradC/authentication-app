import { Service, Container } from "typedi";

import PostgressUserRepository from "../repositories/PostgressUserRepository";
import IUsersService from "../interfaces/services/IUsersService";
import IUser from "../interfaces/base/IUser";
import UserDTO from "../interfaces/DTOs/UserDTO";
import IUserRepositoryLayer from "../interfaces/repository/IUserRepositoryLayer";
import CustomError from "../errorHandlers/ErrorHandler";
@Service()
export default class UsersService implements IUsersService {
  private repository: IUserRepositoryLayer;

  constructor() {
    this.repository = Container.get(PostgressUserRepository);
  }

  postUser = async (details: IUser) => {
    try {
      return await this.repository.createUser(details);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getAllUsers = async (): Promise<UserDTO[] | null> => {
    try {
      return await this.repository.findAllUsers();
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getUserByEmail = async (email: string): Promise<UserDTO | null> => {
    try {
      return await this.repository.findOneByEmail(email);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getUserByUserName = async (user_name: string): Promise<UserDTO | null> => {
    try {
      return await this.repository.findOneByUserName(user_name);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getUserById = async (id: string): Promise<UserDTO | null> => {
    try {
      return await this.repository.findOneById(id);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getAllUsersDetails = async (email: string): Promise<IUser | null> => {
    try {
      return await this.repository.findAllUserDetails(email);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
