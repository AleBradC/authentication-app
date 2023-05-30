import { DeleteResult, UpdateResult } from "typeorm";
import Team from "../../models/Team";
import ITeam from "../base/ITeam";
import TeamDTO from "../DTOs/TeamDTO";

export default interface ITeamRepositoryLayer {
  createTeam: (details: ITeam) => Promise<Team>;
  findAllTeams: () => Promise<TeamDTO[] | null>;
  findOneById: (id: string) => Promise<TeamDTO | null>;
  findOneByName: (name: string) => Promise<TeamDTO | null>;
  updateTeam: (id: string, name: string) => Promise<UpdateResult>;
  addMember: (teamId: string, userId: string) => Promise<Team | null>;
  deleteTeam: (id: string) => Promise<DeleteResult>;
  removeMember: (teamId: string, userId: string) => Promise<Team | null>;
}
