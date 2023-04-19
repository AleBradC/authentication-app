import { Service } from "typedi";
import connectDB from "../dataBase/connectionDB";

import Team from "../dataBase/entities/Team";
import User from "../dataBase/entities/User";

import ITeam from "../interfaces/base/ITeam";
import IUser from "../interfaces/base/IUser";
import ITeamRepositoryLayer from "../interfaces/repository/ITeamRepository";

@Service()
export class PostgressTeamRepository implements ITeamRepositoryLayer {
  private db_connection = connectDB;

  createTeam = async (details: ITeam) => {
    const newTeam = this.db_connection.getRepository(Team).create(details);

    return await this.db_connection.getRepository(Team).save(newTeam);
  };

  findTeamMembers = async (id: string) => {
    return await this.db_connection.getRepository(Team).find;
  };

  findAllTeams = async () => {
    return await this.db_connection.getRepository(Team).find({
      select: {
        id: true,
        name: true,
      },
      relations: {
        admin: true,
        members: true,
      },
    });
  };

  deleteTeam = async (id: string) => {
    return await this.db_connection.getRepository(Team).delete(id);
  };

  updateTeam = async (id: string, name: string) => {
    return await this.db_connection.getRepository(Team).update(
      {
        id: id,
      },
      {
        name: name,
      }
    );
  };

  addMember = async (teamId: string, userId: string) => {
    const team = (await this.db_connection.getRepository(Team).findOne({
      relations: {
        members: true, // just on the many side
      },
      where: { id: teamId },
    })) as ITeam;

    const user = (await this.db_connection.getRepository(User).findOne({
      where: { id: userId },
    })) as IUser;

    team.members = [user];

    return await this.db_connection.manager.save(team);
  };

  removeMember = async (teamId: string, userId: string) => {
    const team = await this.db_connection.getRepository(Team).findOne({
      relations: {
        members: true, // just on the many side
      },
      where: { id: teamId },
    });

    const user = await this.db_connection.getRepository(User).findOne({
      where: { id: userId },
    });

    if (team && user) {
      team.members = team.members.filter((member) => member.id !== user.id);
      return await this.db_connection.getRepository(Team).save(team);
    }

    return null;
  };

  findOneById = async (teamId: string) => {
    return await this.db_connection.getRepository(Team).findOne({
      relations: {
        admin: true,
      },
      where: { id: teamId },
    });
  };
}
