import { TeamDTO } from "../DTOs/TeamDTO";
import { ITeam } from "../ITeam";
import { IUser } from "../IUser";

export interface ITeamService {
  createTeam: (data: ITeam) => void;
  getAllTeams: () => Promise<TeamDTO[]>;
  deleteTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => void;
  addMember: (teamId: string, userId: IUser) => void;
  removeMember: (teamId: string, userId: string) => void;
}
