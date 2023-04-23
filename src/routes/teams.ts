import express from "express";
import { Request, Response } from "express";
import Container from "typedi";

import authorization from "../middlewares/authorization";
import verifyRole from "../middlewares/verifyRole";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";
import {
  TEAM_VALIDATION,
  GENERAL_VALIDATION,
  SUCCESS,
} from "../utils/constants/validations";

const teamRoute = express.Router();

const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

// create team
teamRoute.post(
  "/api/team",
  authorization,
  async (req: Request, res: Response) => {
    const { name, data } = req.body;

    if (!name) {
      return res.status(400).json(TEAM_VALIDATION.NO_TEAM_NAME);
    }

    try {
      const user = await userService.getUserByEmail(data.email);
      if (!user) {
        return res.status(400).json(GENERAL_VALIDATION.USER_NOT_FOUND);
      }

      const existingTeam = await teamService.getTeamByName(name);
      if (existingTeam) {
        return res.status(400).json(TEAM_VALIDATION.TEAM_NAME_USED);
      }

      const admin = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      };

      await teamService.postTeam({ name: name, admin: admin });
      return res.status(200).json(SUCCESS.TEAM_CREATED);
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
    if (!team) {
      return res.status(200).send(TEAM_VALIDATION.NO_TEAM);
    }

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
    const { teamId } = req.params;
    const { name } = req.body;

    try {
      const existingTeam = await teamService.getTeamById(teamId);
      if (existingTeam?.name === name) {
        return res.status(400).json(TEAM_VALIDATION.TEAM_NAME_USED);
      }

      await teamService.updateTeamName(teamId, name);
      return res.status(200).json(SUCCESS.TEAM_UPDATED);
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
    const { teamId, memberId } = req.params;

    try {
      const existingTeam = await teamService.getTeamById(teamId);

      // dont't add the user if it's admin
      const teamAdminId = existingTeam?.admin.id.toString();
      if (teamAdminId === memberId) {
        return res.status(400).json(TEAM_VALIDATION.ADMIN_MEMBER);
      }

      // check if the user is already a member
      const existingMembers = existingTeam?.members.map((member) =>
        member.id.toString()
      );
      if (existingMembers?.includes(memberId)) {
        return res.status(400).json(TEAM_VALIDATION.IS_MEMBER);
      }

      await teamService.putMemberInTeam(teamId, memberId);
      return res.status(200).json(SUCCESS.USER_ADDED);
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
    const { teamId } = req.params;

    try {
      const team = await teamService.deleteTeam(teamId);

      if (!team) {
        return res.status(200).json(TEAM_VALIDATION.NO_TEAM);
      }

      return res.status(200).json(SUCCESS.TEAM_DELETED);
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
    const { teamId, memberId } = req.params;

    try {
      const existingTeam = await teamService.getTeamById(teamId);

      // dont't delete the current user / admin
      const teamAdminId = existingTeam?.admin.id.toString();
      if (teamAdminId === memberId) {
        return res.status(400).json(TEAM_VALIDATION.ADMIN_NO_REMOVE);
      }

      // check if user is in the team
      const existingMembers = existingTeam?.members.map((member) =>
        member.id.toString()
      );
      if (!existingMembers?.includes(memberId)) {
        return res.status(400).json(GENERAL_VALIDATION.USER_NOT_FOUND);
      }

      await teamService.deleteMemberFronTeam(teamId, memberId);
      return res.status(200).json(SUCCESS.USER_REMOVED);
    } catch (error) {
      throw error;
    }
  }
);

export default teamRoute;
