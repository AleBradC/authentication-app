import { TeamDTO } from "../DTOs/TeamDTO";
import { ITeam } from "../ITeam";

export interface ITeamRepositoryLayer {
  createTeam: (details: ITeam) => Promise<TeamDTO | null>;
  findAllTeams: () => Promise<TeamDTO[]>;
  saveTeam: (currentUser: ITeam) => Promise<TeamDTO | null>;
  deleteTeam: (id: string) => void;
}
