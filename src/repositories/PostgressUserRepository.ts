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
        user_name: true,
      },
      relations: {
        owned_teams: {
          admin: true,
        },
      },
    });
  };

  findOneByEmail = async (email: string) => {
    const user = await this.db_connection.getRepository(User).findOneBy({
      email,
    });

    if (!user) {
      return null;
    }
    return user;
  };

  findOneById = async (id: string) => {
    const user = await this.db_connection.getRepository(User).findOneBy({
      id,
    });

    if (!user) {
      return null;
    }
    return user;
  };
}
