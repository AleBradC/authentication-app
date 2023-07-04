export enum AUTH {
  NO_TOKEN = "No token provided",
  NO_AUTHORIZED = "Sorry, you are not authorized !",
  INVALID_TOKEN = "Invalid token",
}

export enum USER_VALIDATION {
  USER_NOT_FOUND = "User not found",
  EMAIL_USED = "This email is already used",
  USER_NAME_USED = "This username is already used",
  WRONG_PASSWARD_OR_EMAIL = "Wrong passward or email",
  EMPTY_INPUTS = "All inputs are required",
  NO_USERS = "There are no users",
  CANT_POST_USER = "Sorry, something came up",
}

export enum TEAM_VALIDATION {
  NO_TEAM_NAME = "Please add a name for the team",
  NO_TEAM = "Team doesn`t exists",
  TEAM_NAME_USED = "This team name is already used",
  ALREADY_MEMBER = "This user is already a member",
  IS_ADMIN = "You can not add yourself as a member in your team",
  ADMIN_NO_REMOVE = "You can`t remove yourself from team",
}

export enum SUCCESS {
  USER_CREATED = "User has been created",
  USER_ADDED = "User added",
  TEAM_CREATED = "Team created",
  TEAM_UPDATED = "Team updated",
  USER_REMOVED = "User removed from team",
  TEAM_DELETED = "Team has been deleted",
}

export enum ERROR_MESSAGE {
  INTERNAL_SERVER_MESG = "Internal Server Error",
  BAD_REQUEST_MSG = "Bad request",
  NOT_FOUND_MSG = "Not found",
}
