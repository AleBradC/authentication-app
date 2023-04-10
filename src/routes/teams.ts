import express from "express";
import Container from "typedi";
import { Request, Response } from "express";

import { TeamService } from "../services/TeamService";

const teamRoute = express.Router();
const teamService = Container.get(TeamService);

teamRoute.post("/api/team", async (req: Request, res: Response) => {
  try {
    // admin -> userul logat care creeaza echipa
    const { name, admin, members } = req.body;

    if (!name) {
      return res.status(400).json("Please add a name");
    }

    const newTeam = await teamService.createTeam({
      name: name,
      admin: admin,
      members: members,
    });

    return res.status(200).json(newTeam);
  } catch (error) {
    throw error;
  }
});

teamRoute.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const teams = await teamService.getAllTeams();

    return res.status(200).send(teams);
  } catch (error) {
    throw error;
  }
});

teamRoute.delete("/api/teams/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await teamService.deleteTeam(id);

    return res.status(200).json("Deleted");
  } catch (error) {
    throw error;
  }
});

teamRoute.put("/api/team/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await teamService.updateTeamName(id, name);

    return res.status(200).json("Updated");
  } catch (error) {
    throw error;
  }
});

teamRoute.put(
  "/api/team/:teamId/member/:memberId",
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

teamRoute.delete(
  "/api/team/:teamId/member/:memberId",
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
