import { TeamDTO } from "./DTOs/TeamDTO";
import { ITeam } from "./ITeam";
import { IUser } from "./IUser";

export interface ITeamService {
  createTeam: (data: ITeam) => Promise<TeamDTO>;
  getAllTeams: () => Promise<TeamDTO[]>;
  deleteTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => Promise<unknown>;
  addMember: (teamId: string, userId: IUser) => void;
  //   deleteMember: () => void;
}
