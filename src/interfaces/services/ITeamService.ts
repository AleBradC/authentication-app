import TeamDTO from "../DTOs/TeamDTO";
import ITeam from "../base/ITeam";
import IUser from "../base/IUser";
export default interface ITeamService {
  createTeam: (data: ITeam) => void;
  getAllTeams: () => Promise<TeamDTO[]>;
  deleteTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => void;
  addMember: (teamId: string, userId: IUser) => void;
  removeMember: (teamId: string, userId: string) => void;
}
