import { Service } from "typedi";

import connectDB from "../dataBase/connectionDB";

import { ITeamRepositoryLayer } from "../interfaces/repository/ITeamRepository";
import { ITeam } from "../interfaces/ITeam";
import { Team } from "../dataBase/entities/Team";
import { IUser } from "src/interfaces/IUser";

@Service()
export class PostgressTeamRepository implements ITeamRepositoryLayer {
  private db_connection = connectDB;

  createTeam = async (details: ITeam) => {
    const newTeam = this.db_connection.getRepository(Team).create(details);

    return await this.db_connection.getRepository(Team).save(newTeam);
  };

  findAllTeams = async () => {
    return await this.db_connection.getRepository(Team).find({
      select: {
        id: true,
        name: true,
        members: true,
      },
      relations: {
        admin: true,
      },
    });
  };

  deleteTeam = async (id: string) => {
    return await this.db_connection.getRepository(Team).delete(id);
  };

  updateTeamName = async (id: string, name: string) => {
    return await this.db_connection.getRepository(Team).update(
      {
        id,
      },
      {
        name,
      }
    );
  };

  addUser = async (teamId: string, userId: any) => {
    return await this.db_connection.getRepository(Team).update(
      {
        id: teamId,
      },
      {
        members: userId,
      }
    );
  };
}
