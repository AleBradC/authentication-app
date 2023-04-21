import OwnedTeamsDTO from "./OwnedTeamsDTO";
import TeamDTO from "./TeamDTO";
export default interface UserDTO {
  id: string;
  user_name: string;
  email: string;
  owned_teams: OwnedTeamsDTO[];
  teams: TeamDTO[];
}
