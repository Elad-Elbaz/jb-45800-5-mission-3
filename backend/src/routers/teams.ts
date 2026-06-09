import { Router } from "express";
import { getAllTeams } from "../controllers/teams/controller";

const teamsRouter = Router()

teamsRouter.get('/', getAllTeams)

export default teamsRouter