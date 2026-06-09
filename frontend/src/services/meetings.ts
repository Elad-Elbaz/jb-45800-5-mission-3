import axios from "axios";
import type Meeting from "../models/Meeting";
import type MeetingDraft from "../models/MeetingDraft";

export async function getMeetingsByTeam(teamId: number): Promise<Meeting[]> {
    const { data } = await axios.get<Meeting[]>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/team/${teamId}`);
    return data;
}

export async function getMeetingById(meetingId: number): Promise<Meeting> {
    const { data } = await axios.get<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/${meetingId}`);
    return data;
}

export async function newMeeting(draft: MeetingDraft): Promise<Meeting> {
    const { data } = await axios.post<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/`, draft);
    return data;
}

export async function updateMeeting(meetingId: number, draft: MeetingDraft): Promise<Meeting> {
    const { data } = await axios.put<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/${meetingId}`, draft);
    return data;
}

export async function deleteMeeting(meetingId: number): Promise<void> {
    await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/${meetingId}`);
}