import ITeam from "./ITeam";

export default interface IAdmin {
  id: string;
  user_name: string;
  email: string;
  owned_teams: ITeam[];
  teams: ITeam[];
}
