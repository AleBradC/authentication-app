import { Service } from "typedi";
import { Repository } from "typeorm";

import connectDB from "../dataBase/connectionDB";
import Team from "../dataBase/entities/Team";
import User from "../dataBase/entities/User";

import ITeam from "../interfaces/base/ITeam";
import ITeamRepositoryLayer from "../interfaces/repository/ITeamRepository";
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
    const newTeam = this.repository.create(details);

    return await this.repository.save(newTeam);
  };

  findAllTeams = async (): Promise<TeamDTO[]> => {
    return await this.repository.find({
      select: {
        id: true,
        name: true,
        admin: {
          id: true,
          user_name: true,
          email: true,
        },
        members: {
          id: true,
          user_name: true,
          email: true,
        },
      },
      relations: ["admin", "members"],
    });
  };

  findOneById = async (teamId: string): Promise<TeamDTO | null> => {
    const team = await this.repository.findOne({
      select: {
        id: true,
        name: true,
        admin: {
          id: true,
          user_name: true,
          email: true,
        },
        members: {
          id: true,
          user_name: true,
          email: true,
        },
      },
      relations: ["admin", "members"],
      where: { id: teamId },
    });

    if (!team) {
      return null;
    }
    return team;
  };

  deleteTeam = async (id: string) => {
    return await this.repository.delete(id);
  };

  updateTeam = async (id: string, name: string) => {
    return await this.repository.update(
      {
        id: id,
      },
      {
        name: name,
      }
    );
  };

  addMember = async (teamId: string, userId: string) => {
    const team = (await this.repository.findOne({
      relations: {
        members: true, // just on the many side
      },
      where: { id: teamId },
    })) as TeamDTO;

    const user = (await this.user_repository.findOne({
      where: { id: userId },
    })) as UserDTO;

    team.members = [user];

    return await this.db_connection.manager.save(team);
  };

  removeMember = async (teamId: string, userId: string) => {
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
  };
}
