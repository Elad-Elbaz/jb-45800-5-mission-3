import axios from "axios";
import type Team from "../models/Team";

export async function getAllTeams(): Promise<Team[]> {
    const { data } = await axios.get<Team[]>(`${import.meta.env.VITE_REST_SERVER_URL}/teams`);
    return data;
}