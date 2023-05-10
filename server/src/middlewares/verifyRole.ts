import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";
import { GENERAL_VALIDATION } from "../utils/constants/validations";

const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teamId } = req.params;
    const { data } = req.body;

    const team = await teamService.getTeamById(teamId);
    const admin = team?.admin;
    const user = await userService.getUserByEmail(data.email);

    if (admin?.id === user?.id) {
      next();
    } else {
      res.status(401).json(GENERAL_VALIDATION.NO_AUTHORIZED);
    }
  } catch (err) {
    console.log(err);
  }
};

export default verifyRole;
