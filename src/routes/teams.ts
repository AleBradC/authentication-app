import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import authorization from "../middlewares/authorization";
import verifyRole from "../middlewares/verifyRole";

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

      const user = await userService.getUserByEmail(data.email);

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

// get user teams -> owned & member
teamRoute.get("/api/teams/:teamId", async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const team = await teamService.getTeamById(teamId);

    return res.status(200).send(team);
  } catch (error) {
    throw error;
  }
});

// update team name -> only by the admin by the admin
teamRoute.put(
  "/api/team/:teamId",
  authorization,
  verifyRole,
  async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;
      const { name } = req.body;

      await teamService.updateTeamName(teamId, name);
      return res.status(200).json("updated");
    } catch (error) {
      throw error;
    }
  }
);

// add member in the team -> only by the admin
teamRoute.put(
  "/api/team/:teamId/member/:memberId",
  authorization,
  verifyRole,
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

// delete team -> only by the admin
teamRoute.delete(
  "/api/teams/:teamId",
  authorization,
  verifyRole,
  async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;

      await teamService.deleteTeam(teamId);
      return res.status(200).json("Deleted");
    } catch (error) {
      throw error;
    }
  }
);

// delete member from team -> only by the admin
teamRoute.delete(
  "/api/team/:teamId/member/:memberId",
  authorization,
  verifyRole,
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
