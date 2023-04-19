import { ITeam } from "../ITeam";

export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  owned_teams: ITeam[];
  teams: ITeam[];
}
