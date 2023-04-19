import { ITeam } from "../ITeam";

export interface UserDTO {
  id: string;
  user_name: string;
  owned_teams: ITeam[];
  teams: ITeam[];
}
