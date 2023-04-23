export enum GENERAL_VALIDATION {
  NO_TOKEN = "A token is required",
  NO_AUTHORIZED = "Sorry, you are not authorized !",
  USER_NOT_FOUND = "This user doesn't exists",
}

export enum USER_VALIDATION {
  EMAIL_USED = "This email is already used",
  USER_NAME_USED = "This user name is already used",
  WRONG_PASSWARD_OR_EMAIL = "Wrong passward or email",
  REQUIRED_INPUTS = "All inputs are required",
}

export enum TEAM_VALIDATION {
  NO_TEAM_NAME = "Please add a name for the team",
  NO_TEAM = "Team doesnt exists",
  TEAM_NAME_USED = "This team name is already used",
  IS_MEMBER = "This user is already a member",
  ADMIN_MEMBER = "You can not add yourself as a member in your team",
}
