import { Service } from "typedi";

import connectDB from "../dataBase/connectionDB";

import { ITeamRepositoryLayer } from "../interfaces/repository/ITeamRepository";
import { ITeam } from "../interfaces/ITeam";
import { Team } from "../dataBase/entities/Team";

@Service()
export class PostgressTeamRepository implements ITeamRepositoryLayer {
  private db_connection = connectDB;

  createTeam = async (details: ITeam) => {
    return await this.db_connection.getRepository(Team).create(details);
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

  saveTeam = async (currentTeam: ITeam) => {
    return await this.db_connection.getRepository(Team).save(currentTeam);
  };
}
