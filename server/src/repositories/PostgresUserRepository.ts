import { Service } from "typedi";
import { Repository } from "typeorm";

import connectDB from "../dataSource";
import User from "../models/User";
import CustomError from "../errorHandlers/ErrorHandler";

import UserDTO from "../interfaces/DTOs/UserDTO";
import IUser from "../interfaces/base/IUser";
import IUserRepositoryLayer from "../interfaces/repository/IUserRepositoryLayer";

@Service()
export default class PostgresUserRepository implements IUserRepositoryLayer {
  private repository: Repository<User>;

  constructor() {
    this.repository = connectDB.getRepository(User);
  }

  createUser = async (details: IUser): Promise<User | any> => {
    try {
      const newUser = this.repository.create(details);
      const savedUser = await this.repository.insert(newUser);

      if (!savedUser) {
        return null;
      }
      return savedUser;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findAllUsers = async (): Promise<UserDTO[] | null> => {
    try {
      const users = await this.repository.find({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
      });

      if (!users) {
        return null;
      }

      return users;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findOneById = async (id: string): Promise<UserDTO | null> => {
    try {
      const user = await this.repository.findOne({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { id },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findOneByEmail = async (email: string): Promise<UserDTO | null> => {
    try {
      const user = await this.repository.findOne({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { email },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findOneByUserName = async (user_name: string): Promise<UserDTO | null> => {
    try {
      const user = await this.repository.findOne({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { user_name },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  // get all the details, incuding the passward
  findAllUserDetails = async (email: string): Promise<IUser | null> => {
    try {
      const user = await this.repository.findOne({
        select: {
          password: true,
        },
        where: { email },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
