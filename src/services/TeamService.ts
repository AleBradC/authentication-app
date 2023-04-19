import { Service, Container } from "typedi";

import PostgressTeamRepository from "../repositories/PostgressTeamRepository";
import ITeamService from "../interfaces/services/ITeamService";
import ITeam from "../interfaces/base/ITeam";
import TeamDTO from "src/interfaces/DTOs/TeamDTO";
import IUser from "src/interfaces/base/IUser";
import UserDTO from "src/interfaces/DTOs/UserDTO";

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

  deleteTeam = async (id: string) => {
    return await this.repository.deleteTeam(id);
  };

  updateTeamName = async (id: string, name: string) => {
    return await this.repository.updateTeam(id, name);
  };

  putMemberInTeam = async (teamId: string, userId: any) => {
    return await this.repository.addMember(teamId, userId);
  };

  deleteMemberFronTeam = async (teamId: string, userId: string) => {
    return await this.repository.removeMember(teamId, userId);
  };

  getTeamById = async (teamId: string): Promise<TeamDTO | null> => {
    return await this.repository.findOneById(teamId);
  };
}
