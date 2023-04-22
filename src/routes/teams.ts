import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import authorization from "../middlewares/authorization";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";

const teamRoute = express.Router();

const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

// create team
teamRoute.post(
  "/api/team",
  authorization,
  async (req: Request, res: Response) => {
    try {
      const { name, data } = req.body;

      if (!name) {
        return res.status(400).json("Please add a name");
      }

      const user = await userService.getUserByEmail(data);

      if (!user) {
        return res.status(400).json("User not found");
      }

      const admin = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      };

      const teamDetails = { name: name, admin: admin };

      await teamService.postTeam(teamDetails);
      return res.status(200).json("Team created");
    } catch (error) {
      throw error;
    }
  }
);

// get user teams -> owned & member
teamRoute.get("/api/teams", async (_req: Request, res: Response) => {
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
  authorization,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { data } = req.body;

      const team = await teamService.getTeamById(id);
      const teamAdmin = team?.admin;
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
  authorization,
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
  authorization,
  async (req: Request, res: Response) => {
    try {
      const { teamId, memberId } = req.params;

      await teamService.putMemberInTeam(teamId, memberId);

      return res.status(200).json("User added");
    } catch (error) {
      throw error;
    }
  }
);

// delete member from team -> only by the admin
teamRoute.delete(
  "/api/team/:teamId/member/:memberId",
  authorization,
  async (req: Request, res: Response) => {
    try {
      const { teamId, memberId } = req.params;

      await teamService.deleteMemberFronTeam(teamId, memberId);

      return res.status(200).json("User removed");
    } catch (error) {
      throw error;
    }
  }
);

export default teamRoute;
