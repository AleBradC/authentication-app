import express from "express";
import { Request, Response } from "express";
import { TeamService } from "../services/TeamService";
import Container from "typedi";

const teamRoute = express.Router();

teamRoute.post("/api/teams", async (req: Request, res: Response) => {
  const teamService = Container.get(TeamService);

  try {
    const { name, admin, members } = req.body;

    if (!name) {
      return res.status(400).json("Please add a name");
    }

    const newTeam = {
      name: name,
      admin: admin,
      members: members,
    };

    const response = await teamService.createTeam(newTeam);

    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

teamRoute.get("/api/teams", async (req: Request, res: Response) => {
  const teamService = Container.get(TeamService);

  const result = await teamService.getAllTeams();
  return res.status(200).send(result);
});

teamRoute.delete("/api/teams/:id", async (req: Request, res: Response) => {
  const teamService = Container.get(TeamService);

  try {
    const { id } = req.params;

    await teamService.deleteTeam(id);
    return res.status(200).json("deleted");
  } catch (error) {
    throw error;
  }
});

export default teamRoute;
