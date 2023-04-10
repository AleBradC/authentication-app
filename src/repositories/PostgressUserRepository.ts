import { Service } from "typedi";

import connectDB from "../dataBase/connectionDB";
import { User } from "../dataBase/entities/User";
import { IUser } from "../interfaces/IUser";

import { IUserRepositoryLayer } from "../interfaces/repository/IUserRepositoryLayer";

@Service()
export class PostgressUserRepository implements IUserRepositoryLayer {
  private db_connection = connectDB;

  createUser = async (details: IUser) => {
    const newUser = this.db_connection.getRepository(User).create(details);

    return await this.db_connection.getRepository(User).save(newUser);
  };

  findAllUsers = async () => {
    return await this.db_connection.getRepository(User).find({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true,
        owned_teams: true,
      },
    });
  };

  findOneByEmail = async (email: string) => {
    return await this.db_connection.getRepository(User).findOneBy({
      email,
    });
  };

  findOneById = async (id: string) => {
    return await this.db_connection.getRepository(User).findOneBy({
      id,
    });
  };
}
