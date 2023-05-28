import { Service } from "typedi";
import { DataSource, Repository } from "typeorm";

import connectDB from "../dataSource";
import Team from "../models/Team";
import User from "../models/User";

import ITeam from "../interfaces/base/ITeam";
import ITeamRepositoryLayer from "../interfaces/repository/ITeamRepositoryLayer";
import TeamDTO from "../interfaces/DTOs/TeamDTO";
import UserDTO from "../interfaces/DTOs/UserDTO";
import CustomError from "../errorHandlers/ErrorHandler";

@Service()
export default class PostgressTeamRepository implements ITeamRepositoryLayer {
  private repository: Repository<Team>;
  private user_repository: Repository<User>;
  private db_connection: DataSource;

  constructor() {
    this.repository = connectDB.getRepository(Team);
    this.user_repository = connectDB.getRepository(User);
    this.db_connection = connectDB;
  }

  createTeam = async (details: ITeam) => {
    try {
      const newTeam = this.repository.create(details);

      return await this.repository.save(newTeam);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findAllTeams = async (): Promise<TeamDTO[] | null> => {
    try {
      const teams = await this.repository.find({
        relations: ["admin", "members"],
      });

      if (!teams) {
        return null;
      }

      return teams;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findOneById = async (id: string): Promise<TeamDTO | null> => {
    try {
      const team = await this.repository.findOne({
        relations: ["admin", "members"],
        where: { id },
      });

      if (!team) {
        return null;
      }

      return team;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  findOneByName = async (name: string): Promise<TeamDTO | null> => {
    try {
      const team = await this.repository.findOne({
        relations: ["admin", "members"],
        where: { name },
      });

      if (!team) {
        return null;
      }

      return team;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  updateTeam = async (id: string, name: string) => {
    try {
      return await this.repository.update(
        {
          id: id,
        },
        {
          name: name,
        }
      );
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  addMember = async (teamId: string, userId: string) => {
    try {
      const team = (await this.repository.findOne({
        relations: {
          members: true, // just on the many side
        },
        where: { id: teamId },
      })) as TeamDTO;

      const user = (await this.user_repository.findOne({
        where: { id: userId },
      })) as UserDTO;

      if (!team || !user) {
        return null;
      }

      team.members.push(user);
      return await this.db_connection.manager.save(team);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  deleteTeam = async (id: string) => {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  removeMember = async (teamId: string, userId: string) => {
    try {
      const team = await this.repository.findOne({
        relations: {
          members: true, // just on the many side
        },
        where: { id: teamId },
      });

      const user = await this.user_repository.findOne({
        where: { id: userId },
      });

      if (!team || !user) {
        return null;
      }

      team.members = team.members.filter((member) => member.id !== user.id);
      return await this.repository.save(team);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
