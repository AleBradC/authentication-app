import { Service, Container } from "typedi";

import { ITeamService } from "../interfaces/ITeamService";
import { ITeam } from "../interfaces/ITeam";
import { PostgressTeamRepository } from "../repositories/PostgressTeamRepository";

@Service()
export class TeamService implements ITeamService {
  private repository = Container.get(PostgressTeamRepository);

  createTeam = async (details: ITeam) => {
    return await this.repository.createTeam({
      name: details.name,
      members: details.members,
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
    return await this.repository.updateTeamName(id, name);
  };

  addMember = async (teamId: string, userId: any) => {
    return await this.repository.addUser(teamId, userId);
  };
}
