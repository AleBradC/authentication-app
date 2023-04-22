import TeamDTO from "../DTOs/TeamDTO";
import ITeam from "../base/ITeam";
import IUser from "../base/IUser";
export default interface ITeamService {
  postTeam: (details: ITeam) => void;
  getAllTeams: () => Promise<TeamDTO[]>;
  getTeamById: (id: string) => Promise<TeamDTO | null>;
  updateTeamName: (id: string, name: string) => void;
  putMemberInTeam: (teamId: string, userId: IUser) => void;
  deleteTeam: (id: string) => void;
  deleteMemberFronTeam: (teamId: string, userId: string) => void;
}
