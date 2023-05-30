import { Service, Container } from "typedi";

import Team from "../models/Team";
import PostgressTeamRepository from "../repositories/PostgressTeamRepository";
import ITeamService from "../interfaces/services/ITeamService";
import ITeam from "../interfaces/base/ITeam";
import TeamDTO from "../interfaces/DTOs/TeamDTO";
import CustomError from "../errorHandlers/ErrorHandler";
import { DeleteResult, UpdateResult } from "typeorm";
import IUser from "src/interfaces/base/IUser";

@Service()
export default class TeamService implements ITeamService {
  private repository = Container.get(PostgressTeamRepository);

  postTeam = async (details: ITeam): Promise<Team> => {
    try {
      return await this.repository.createTeam({
        name: details.name,
        admin: details.admin,
      });
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getAllTeams = async (): Promise<TeamDTO[] | null> => {
    try {
      return await this.repository.findAllTeams();
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getTeamById = async (id: string): Promise<TeamDTO | null> => {
    try {
      return await this.repository.findOneById(id);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getTeamByName = async (id: string): Promise<TeamDTO | null> => {
    try {
      return await this.repository.findOneByName(id);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  updateTeamName = async (id: string, name: string): Promise<UpdateResult> => {
    try {
      return await this.repository.updateTeam(id, name);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  putMemberInTeam = async (
    teamId: string,
    userId: string
  ): Promise<Team | null> => {
    try {
      return await this.repository.addMember(teamId, userId);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  deleteTeam = async (id: string): Promise<DeleteResult> => {
    try {
      return await this.repository.deleteTeam(id);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  deleteMemberFronTeam = async (
    teamId: string,
    userId: string
  ): Promise<Team | null> => {
    try {
      return await this.repository.removeMember(teamId, userId);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
