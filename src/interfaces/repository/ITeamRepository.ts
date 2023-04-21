import ITeam from "../base/ITeam";
import TeamDTO from "../DTOs/TeamDTO";

export default interface ITeamRepositoryLayer {
  createTeam: (details: ITeam) => void;
  findAllTeams: () => Promise<TeamDTO[]>;
  findOneById: (id: string) => Promise<TeamDTO | null>;
  deleteTeam: (id: string) => void;
  updateTeam: (id: string, name: string) => void;
  addMember: (teamId: string, userId: string) => void;
  removeMember: (teamId: string, userId: string) => void;
}
