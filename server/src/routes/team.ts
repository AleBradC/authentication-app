import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { Container } from "typedi";

import authorizationMiddleware from "../middlewares/authorization";
import verifyRoleMiddleware from "../middlewares/verifyRole";

import TeamService from "../services/TeamService";
import UsersService from "../services/UsersService";
import {
  TEAM_VALIDATION,
  USER_VALIDATION,
  SUCCESS,
} from "../utils/constants/validations";
import { STATUS_CODE } from "../utils/constants/statusCode";
import { eventEmitter } from "./event";

const teamRoute = express.Router();

const teamService = Container.get(TeamService);
const userService = Container.get(UsersService);

teamRoute.post(
  "/api/team",
  authorizationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, data } = req.body;

      if (!name) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: TEAM_VALIDATION.NO_TEAM_NAME,
        });
      }

      const user = await userService.getUserByEmail(data.email);
      if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: USER_VALIDATION.USER_NOT_FOUND,
        });
      }

      const existingTeam = await teamService.getTeamByName(name);
      if (existingTeam) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: TEAM_VALIDATION.TEAM_NAME_USED,
        });
      }

      const admin = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      };

      await teamService.postTeam({ name: name, admin: admin });

      return res.status(STATUS_CODE.OK).json({
        message: SUCCESS.TEAM_CREATED,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// get user teams -> owned & member
teamRoute.get(
  "/api/teams",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await teamService.getAllTeams();

      return res.status(STATUS_CODE.OK).json(teams);
    } catch (error) {
      return next(error);
    }
  }
);

// get user teams -> owned & member
teamRoute.get(
  "/api/teams/:teamId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamId } = req.params;

      const team = await teamService.getTeamById(teamId);
      if (!team) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: TEAM_VALIDATION.NO_TEAM,
        });
      }

      return res.status(STATUS_CODE.OK).json(team);
    } catch (error) {
      return next(error);
    }
  }
);

// update team name -> only by the admin by the admin
teamRoute.put(
  "/api/team/:teamId",
  authorizationMiddleware,
  verifyRoleMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamId } = req.params;
      const { name } = req.body;

      const existingTeam = await teamService.getTeamById(teamId);
      if (existingTeam?.name === name) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: TEAM_VALIDATION.TEAM_NAME_USED,
        });
      }

      await teamService.updateTeamName(teamId, name);
      return res.status(STATUS_CODE.OK).json({
        message: SUCCESS.TEAM_UPDATED,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// add member in the team -> only by the admin
teamRoute.put(
  "/api/team/:teamId/member/:memberId",
  authorizationMiddleware,
  verifyRoleMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamId, memberId } = req.params;

      const existingTeam = await teamService.getTeamById(teamId);

      // don't add the user if it's admin
      const teamAdminId = existingTeam?.admin.id.toString();
      if (teamAdminId === memberId) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: TEAM_VALIDATION.IS_ADMIN,
        });
      }

      // check if the user is already a member
      const existingMembers = existingTeam?.members.map((member) =>
        member.id.toString()
      );
      if (existingMembers?.includes(memberId)) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: TEAM_VALIDATION.ALREADY_MEMBER,
        });
      }

      const data = SUCCESS.USER_ADDED;

      await teamService.putMemberInTeam(teamId, memberId);
      eventEmitter.emit("message", data);

      return res.status(STATUS_CODE.OK).json({
        message: SUCCESS.USER_ADDED,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// delete team -> only by the admin
teamRoute.delete(
  "/api/teams/:teamId",
  authorizationMiddleware,
  verifyRoleMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamId } = req.params;

      const team = await teamService.deleteTeam(teamId);
      if (!team) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: TEAM_VALIDATION.NO_TEAM,
        });
      }

      return res.status(STATUS_CODE.OK).json({
        message: SUCCESS.TEAM_DELETED,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// delete member from team -> only by the admin
teamRoute.delete(
  "/api/team/:teamId/member/:memberId",
  authorizationMiddleware,
  verifyRoleMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamId, memberId } = req.params;

      const existingTeam = await teamService.getTeamById(teamId);

      // don't delete the current user / admin
      const teamAdminId = existingTeam?.admin.id.toString();
      if (teamAdminId === memberId) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: TEAM_VALIDATION.ADMIN_NO_REMOVE,
        });
      }

      // check if user is in the team
      const existingMembers = existingTeam?.members.map((member) =>
        member.id.toString()
      );
      if (!existingMembers?.includes(memberId)) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: USER_VALIDATION.USER_NOT_FOUND,
        });
      }

      await teamService.deleteMemberFronTeam(teamId, memberId);
      return res.status(STATUS_CODE.OK).json({
        message: SUCCESS.USER_REMOVED,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default teamRoute;
