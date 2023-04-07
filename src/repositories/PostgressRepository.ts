import { Service } from "typedi";

import connectDB from "../dataBase/connectionDB";
import { User } from "../dataBase/entities/User";
import { IUser } from "../interfaces/IUser";

import { IUserRepositoryLayer } from "../interfaces/repository/IUserRepositoryLayer";

@Service()
export class PostgressRepository implements IUserRepositoryLayer {
  private db_connection = connectDB;

  findAllUsers = async () => {
    return await this.db_connection.getRepository(User).find({
      select: {
        first_name: true,
        last_name: true,
        id: true,
        role: true,
      },
    });
  };

  findOneUserByEmail = async (email: string) => {
    return await this.db_connection.getRepository(User).findOneBy({
      email: email,
    });
  };

  findOneUserById = async (itemId: number) => {
    return await this.db_connection.getRepository(User).findOneBy({
      id: itemId,
    });
  };

  createUser = async (details: IUser) => {
    return await this.db_connection.getRepository(User).create(details);
  };

  saveUser = async (currentUser: IUser) => {
    return await this.db_connection.getRepository(User).save(currentUser);
  };
}
