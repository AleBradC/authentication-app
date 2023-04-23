import { Service } from "typedi";
import { Repository } from "typeorm";

import connectDB from "../dataBase/connectionDB";
import Team from "../dataBase/entities/Team";
import User from "../dataBase/entities/User";

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
    const newTeam = this.repository.create(details);

    return await this.repository.save(newTeam);
  };

  findAllTeams = async (): Promise<TeamDTO[]> => {
    return await this.repository.find({
      relations: ["admin", "members"],
    });
  };

  findOneById = async (id: string): Promise<TeamDTO | null> => {
    const team = await this.repository.findOne({
      relations: ["admin", "members"],
      where: { id },
    });

    if (!team) {
      return null;
    }
    return team;
  };

  findOneByName = async (name: string): Promise<TeamDTO | null> => {
    const team = await this.repository.findOne({
      relations: ["admin", "members"],
      where: { name },
    });

    if (!team) {
      return null;
    }
    return team;
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

    team.members.push(user);

    return await this.db_connection.manager.save(team);
  };

  deleteTeam = async (id: string) => {
    return await this.repository.delete(id);
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
