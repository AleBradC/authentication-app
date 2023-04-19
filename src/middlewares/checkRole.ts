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

    try {
      //   const user = await userService.getUserByEmail(email);
      //   const team = await teamService.getTeamById(id);
      //   if (user) {
      //     if (team?.admin.id.includes(user.id)) {
      //       return next();
      //     } else {
      //       return res.send("you have no rights");
      //     }
      //   }
    } catch (error) {
      console.log(error);
    }
  };

export default checkRole;
