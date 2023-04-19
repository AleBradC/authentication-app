import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import { TeamService } from "../services/TeamService";
import { UsersService } from "../services/UsersService";
import { IAdmin } from "../interfaces/IAdmin";
import authMiddleware from "../middlewares/authentication";
import checkRole from "../middlewares/checkRole";

const teamRoute = express.Router();
const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

// create team
teamRoute.post(
  "/api/team",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { name, data } = req.body;

      if (!name) {
        return res.status(400).json("Please add a name");
      }
      const { id, first_name, last_name } = (await userService.getUserByEmail(
        data.email
      )) as IAdmin;

      const admin = {
        id: id,
        first_name: first_name,
        last_name: last_name,
      };

      const newTeam = await teamService.createTeam({
        name: name,
        admin: admin,
      });

      return res.status(200).json(newTeam);
    } catch (error) {
      throw error;
    }
  }
);

// get user teams -> owned & member
teamRoute.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const teams = await teamService.getAllTeams();

    return res.status(200).send(teams);
  } catch (error) {
    throw error;
  }
});

// delete team -> only by the admin
teamRoute.delete(
  "/api/teams/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { data } = req.body;

      const team = await teamService.getTeamById(id);
      const teamAdmin = team?.admin.id;
      const userId = await userService.getUserByEmail(data.email);

      if (teamAdmin === userId?.id) {
        await teamService.deleteTeam(id);
        return res.status(200).json("Deleted");
      } else {
        return res.status(400).json("Nu merge");
      }
    } catch (error) {
      throw error;
    }
  }
);

// update team name -> only by the admin by the admin
teamRoute.put(
  "/api/team/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await teamService.updateTeamName(id, name);

      return res.status(200).json("Updated");
    } catch (error) {
      throw error;
    }
  }
);

// add member in the team -> only by the admin
teamRoute.put(
  "/api/team/:teamId/member/:memberId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { teamId, memberId } = req.params;

      await teamService.addMember(teamId, memberId);

      return res.status(200).json("User added");
    } catch (error) {
      throw error;
    }
  }
);

// delete member from team -> only by the admin
teamRoute.delete(
  "/api/team/:teamId/member/:memberId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { teamId, memberId } = req.params;

      await teamService.removeMember(teamId, memberId);

      return res.status(200).json("User removed");
    } catch (error) {
      throw error;
    }
  }
);

export default teamRoute;
