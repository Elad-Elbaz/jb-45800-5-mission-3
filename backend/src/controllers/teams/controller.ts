import type { NextFunction, Request, Response } from "express";
import Team from "../../models/Team";

export async function getAllTeams(request: Request, response: Response, next: NextFunction) {
    try {
        const teams = await Team.findAll();
        response.json(teams);
    } catch (e) {
        next(e);
    }
}