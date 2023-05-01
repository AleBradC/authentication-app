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
    const users = await this.repository.find({
      relations: [
        "owned_teams",
        "owned_teams.members",
        "teams",
        "teams.admin",
        "teams.members",
      ],
    });

    return users;
  };

  findOneById = async (id: string): Promise<UserDTO | null> => {
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
  };

  findOneByEmail = async (email: string): Promise<UserDTO | null> => {
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
  };

  findOneByUserName = async (user_name: string): Promise<UserDTO | null> => {
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
  };

  // get all the details, incuding the passward
  findAllUserDetails = async (email: string): Promise<IUser | null> => {
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
  };
}
