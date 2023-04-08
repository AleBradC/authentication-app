import { TeamDTO } from "./DTOs/TeamDTO";
import { ITeam } from "./ITeam";

export interface ITeamService {
  createTeam: (data: ITeam) => Promise<TeamDTO>;
  getAllTeams: () => Promise<TeamDTO[]>;
  deleteTeam: (id: string) => void;
  //   updateTeam: () => void;
  //   addMember: () => void;
  //   deleteMember: () => void;
}
