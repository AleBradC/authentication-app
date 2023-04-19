import { Service, Container } from "typedi";

import PostgressTeamRepository from "../repositories/PostgressTeamRepository";
import ITeamService from "../interfaces/services/ITeamService";
import ITeam from "../interfaces/base/ITeam";

@Service()
export default class TeamService implements ITeamService {
  private repository = Container.get(PostgressTeamRepository);

  createTeam = async (details: ITeam) => {
    return await this.repository.createTeam({
      name: details.name,
      admin: details.admin,
    });
  };

  getAllTeams = async () => {
    return await this.repository.findAllTeams();
  };

  deleteTeam = async (id: string) => {
    return await this.repository.deleteTeam(id);
  };

  updateTeamName = async (id: string, name: string) => {
    return await this.repository.updateTeam(id, name);
  };

  addMember = async (teamId: string, userId: any) => {
    return await this.repository.addMember(teamId, userId);
  };

  removeMember = async (teamId: string, userId: any) => {
    return await this.repository.removeMember(teamId, userId);
  };

  getTeamById = async (teamId: string) => {
    return await this.repository.findOneById(teamId);
  };
}
