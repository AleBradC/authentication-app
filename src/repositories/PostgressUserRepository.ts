import { Service } from "typedi";
import { Repository } from "typeorm";

import connectDB from "../dataBase/connectionDB";
import User from "../dataBase/entities/User";

import UserDTO from "../interfaces/DTOs/UserDTO";
import IUser from "../interfaces/base/IUser";
import IUserRepositoryLayer from "../interfaces/repository/IUserRepositoryLayer";

@Service()
export default class PostgressUserRepository implements IUserRepositoryLayer {
  private repository: Repository<User>;

  constructor() {
    this.repository = connectDB.getRepository(User);
  }

  createUser = async (details: IUser) => {
    const newUser = this.repository.create(details);

    return await this.repository.save(newUser);
  };

  findAllUsers = async (): Promise<UserDTO[]> => {
    return await this.repository.find({
      select: {
        id: true,
        user_name: true,
        email: true,
      },
      relations: ["owned_teams", "teams"],
    });
  };

  findOneById = async (id: string): Promise<UserDTO | null> => {
    const user = await this.repository.findOne({
      select: {
        id: true,
        user_name: true,
        email: true,
      },
      relations: ["owned_teams", "teams"],
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  };

  findOneByEmail = async (email: string): Promise<UserDTO | null> => {
    const user = await this.repository.findOne({
      select: {
        id: true,
        user_name: true,
        email: true,
      },
      relations: ["owned_teams", "teams"],
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  };

  // get all the details, incuding the passward
  findAllUserDetails = async (email: string): Promise<IUser | null> => {
    const user = await this.repository.findOneBy({
      email,
    });

    if (!user) {
      return null;
    }
    return user;
  };
}
