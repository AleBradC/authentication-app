import { Service, Container } from "typedi";

import PostgressTeamRepository from "../repositories/PostgressTeamRepository";
import ITeamService from "../interfaces/services/ITeamService";
import ITeam from "../interfaces/base/ITeam";
import TeamDTO from "../interfaces/DTOs/TeamDTO";

@Service()
export default class TeamService implements ITeamService {
  private repository = Container.get(PostgressTeamRepository);

  postTeam = async (details: ITeam) => {
    return await this.repository.createTeam({
      name: details.name,
      admin: details.admin,
    });
  };

  getAllTeams = async () => {
    return await this.repository.findAllTeams();
  };

  getTeamById = async (id: string): Promise<TeamDTO | null> => {
    return await this.repository.findOneById(id);
  };

  updateTeamName = async (id: string, name: string) => {
    return await this.repository.updateTeam(id, name);
  };

  putMemberInTeam = async (teamId: string, userId: any) => {
    return await this.repository.addMember(teamId, userId);
  };

  deleteTeam = async (id: string) => {
    return await this.repository.deleteTeam(id);
  };

  deleteMemberFronTeam = async (teamId: string, userId: string) => {
    return await this.repository.removeMember(teamId, userId);
  };
}
