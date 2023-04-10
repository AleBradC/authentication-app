import { TeamDTO } from "../DTOs/TeamDTO";
// import { UpdatedTeamDTO } from "../DTOs/UpdatedTeamDTO";
import { ITeam } from "../ITeam";
import { IUser } from "../IUser";

export interface ITeamRepositoryLayer {
  createTeam: (details: ITeam) => Promise<TeamDTO | null>;
  findAllTeams: () => Promise<TeamDTO[]>;
  deleteTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => Promise<unknown>;
  addUser: (teamId: string, userId: unknown) => Promise<unknown>;
}
