import ITeam from "../base/ITeam";
export default interface UserDTO {
  id: string;
  user_name: string;
  owned_teams: ITeam[];
  teams: ITeam[];
}
