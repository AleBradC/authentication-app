import TeamDTO from "../DTOs/TeamDTO";
import ITeam from "../base/ITeam";
import IUser from "../base/IUser";
export default interface ITeamService {
  postTeam: (data: ITeam) => void;
  getAllTeams: () => Promise<TeamDTO[]>;
  getTeamById: (teamId: string) => Promise<TeamDTO | null>;
  deleteTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => void;
  putMemberInTeam: (teamId: string, userId: IUser) => void;
  deleteMemberFronTeam: (teamId: string, userId: string) => void;
}
