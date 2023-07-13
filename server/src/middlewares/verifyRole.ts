import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";
import { AUTH, TEAM_VALIDATION } from "../utils/constants/validations";
import { STATUS_CODE } from "../utils/constants/statusCode";
import CustomError from "../errorHandlers/ErrorHandler";

const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

const verifyRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId } = req.params;
    const { data } = req.body;

    const team = await teamService.getTeamById(teamId);
    const admin = team?.admin;
    const user = await userService.getUserByEmail(data.email);

    if (!team) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        message: TEAM_VALIDATION.NO_TEAM,
      });
    }

    if (admin?.id !== user?.id) {
      res.status(STATUS_CODE.UNAUTHORIZED).json({
        message: AUTH.NO_AUTHORIZED,
      });
    }

    next();
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
};

export default verifyRoleMiddleware;
