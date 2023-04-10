import { ITeam } from "../ITeam";

export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  teams: ITeam[];
  owned_teams: ITeam;
}
