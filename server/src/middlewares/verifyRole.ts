import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";
import { AUTH } from "../utils/constants/validations";

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

    if (admin?.id === user?.id) {
      next();
    }

    res.status(401).json(AUTH.NO_AUTHORIZED);
  } catch (err) {
    console.log(err);
  }
};

export default verifyRoleMiddleware;
