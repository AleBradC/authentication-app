import { Service } from "typedi";

import connectDB from "../dataBase/connectionDB";
import { User } from "../dataBase/entities/User";
import { IUser } from "../interfaces/IUser";

import { IUserRepositoryLayer } from "../interfaces/repository/IUserRepositoryLayer";
import { UserDTO } from "src/interfaces/DTOs/UserDTO";

@Service()
export class PostgressUserRepository implements IUserRepositoryLayer {
  private db_connection = connectDB;

  findAllUsers = async () => {
    return await this.db_connection.getRepository(User).find({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true,
        teams: true,
        owned_teams: true,
      },
    });
  };

  findOneUserByEmail = async (email: string) => {
    return await this.db_connection.getRepository(User).findOneBy({
      email: email,
    });
  };

  findOneUserById = async (itemId: string) => {
    return await this.db_connection.getRepository(User).findOneBy({
      id: itemId,
    });
  };

  createUser = async (details: IUser) => {
    const newUser = this.db_connection.getRepository(User).create(details);

    return await this.db_connection.getRepository(User).save(newUser);
  };
}
