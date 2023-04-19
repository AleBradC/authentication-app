import { TeamDTO } from "../DTOs/TeamDTO";
import { ITeam } from "../ITeam";
import { IUser } from "../IUser";

export interface ITeamRepositoryLayer {
  createTeam: (details: ITeam) => void;
  findTeamMembers: (id: string) => Promise<any>;
  findAllTeams: () => Promise<TeamDTO[]>;
  deleteTeam: (id: string) => void;
  updateTeam: (id: string, name: string) => void;
  addMember: (teamId: string, userId: string) => void;
  removeMember: (teamId: string, userId: string) => void;
}
