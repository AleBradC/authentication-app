import ITeam from "../base/ITeam";
import TeamDTO from "../DTOs/TeamDTO";

export default interface ITeamRepositoryLayer {
  createTeam: (details: ITeam) => void;
  findAllTeams: () => Promise<TeamDTO[]>;
  findOneById: (id: string) => Promise<TeamDTO | null>;
  findOneByName: (name: string) => Promise<TeamDTO | null>;
  updateTeam: (id: string, name: string) => void;
  addMember: (teamId: string, userId: string) => void;
  deleteTeam: (id: string) => void;
  removeMember: (teamId: string, userId: string) => void;
}
