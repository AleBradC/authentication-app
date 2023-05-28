import { Service } from "typedi";
import { Repository } from "typeorm";

import connectDB from "../dataSource";
import Team from "../models/Team";
import User from "../models/User";

import ITeam from "../interfaces/base/ITeam";
import ITeamRepositoryLayer from "../interfaces/repository/ITeamRepositoryLayer";
import TeamDTO from "../interfaces/DTOs/TeamDTO";
import UserDTO from "../interfaces/DTOs/UserDTO";

@Service()
export default class PostgressTeamRepository implements ITeamRepositoryLayer {
  private repository: Repository<Team>;
  private user_repository: Repository<User>;
  private db_connection;

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
      console.log("Error in createTeam:", error);
      throw error;
    }
  };

  findAllTeams = async (): Promise<TeamDTO[]> => {
    try {
      return await this.repository.find({
        relations: ["admin", "members"],
      });
    } catch (error) {
      console.log("Error in findAllTeams:", error);
      throw error;
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
      console.log("Error in findOneById:", error);
      throw error;
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
      console.log("Error in findOneByName:", error);
      throw error;
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
      console.log("Error in updateTeam:", error);
      throw error;
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

      team.members.push(user);

      return await this.db_connection.manager.save(team);
    } catch (error) {
      console.log("Error in addMember:", error);
      throw error;
    }
  };

  deleteTeam = async (id: string) => {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      console.log("Error in deleteTeam:", error);
      throw error;
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

      if (team && user) {
        team.members = team.members.filter((member) => member.id !== user.id);
        return await this.repository.save(team);
      }

      return null;
    } catch (error) {
      console.log("Error in removeMember:", error);
      throw error;
    }
  };
}
