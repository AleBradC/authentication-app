import { DeleteResult, UpdateResult } from "typeorm";
import Team from "../../models/Team";
import TeamDTO from "../DTOs/TeamDTO";
import ITeam from "../base/ITeam";
export default interface ITeamService {
  postTeam: (details: ITeam) => Promise<Team>;
  getAllTeams: () => Promise<TeamDTO[] | null>;
  getTeamById: (id: string) => Promise<TeamDTO | null>;
  getTeamByName: (name: string) => Promise<TeamDTO | null>;
  updateTeamName: (id: string, name: string) => Promise<UpdateResult>;
  putMemberInTeam: (teamId: string, userId: string) => Promise<Team | null>;
  deleteTeam: (id: string) => Promise<DeleteResult>;
  deleteMemberFronTeam: (
    teamId: string,
    userId: string
  ) => Promise<Team | null>;
}
