import { NextFunction, Request, Response } from "express";
import Container from "typedi";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";

const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

const checkRole =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const { id } = req.params;

    console.log(req);

    return next();
  };

export default checkRole;
