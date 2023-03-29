import { Service } from "typedi";

import connectDB from "../dataBase/connectionDB";
import { User } from "../dataBase/entities/User";
import { IUser } from "../interfaces/IRepositoryLayer";
import { IRepositoryLayer } from "../interfaces/IRepositoryLayer";

@Service()
export class PostgressRepository implements IRepositoryLayer {
  private db_connection = connectDB;

  findAll = async () => {
    return await this.db_connection.getRepository(User).find();
  };

  findOneByEmail = async (email: string) => {
    return await this.db_connection.getRepository(User).findOneBy({
      email: email,
    });
  };

  createUser = async (details: IUser) => {
    return await this.db_connection.getRepository(User).create(details);
  };

  saveUser = async (currentUser: IUser) => {
    return await this.db_connection.getRepository(User).save(currentUser);
  };
}
