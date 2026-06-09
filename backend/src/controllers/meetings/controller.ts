import type { NextFunction, Request, Response } from "express";
import Meeting from "../../models/Meeting";
import Team from "../../models/Team";

export async function getMeetingsByTeam(request: Request<{teamId: string}, {}, {}, {}>, response: Response, next: NextFunction) {
    try {
        const teamId = request.params.teamId;
        const meetings = await Meeting.findAll({
            where: { teamId },
            include: [Team]
        });
        response.json(meetings);
    } catch (e) {
        next(e);
    }
}

export async function getMeetingById(request: Request<{meetingId: string}, {}, {}, {}>, response: Response, next: NextFunction) {
    try {
        const meetingId = request.params.meetingId;
        const meeting = await Meeting.findByPk(meetingId, {
            include: [Team]
        });
        if (!meeting) {
            return next({ status: 404, message: 'Meeting not found' });
        }
        response.json(meeting);
    } catch (e) {
        next(e);
    }
}

export async function newMeeting(request: Request<{}, {}, {teamId: number, startTime: Date, endTime: Date, description: string, room: string}>, response: Response, next: NextFunction) {
    try {
        const meeting = await Meeting.create({
            ...request.body
        });
        response.json(meeting);
    } catch (e) {
        next(e);
    }
}

export async function updateMeeting(request: Request<{meetingId: string}, {}, {teamId: number, startTime: Date, endTime: Date, description: string, room: string}>, response: Response, next: NextFunction) {
    try {
        const { meetingId } = request.params;
        const [numberOfRowsUpdated] = await Meeting.update({ ...request.body }, { where: { id: meetingId } });

        if (numberOfRowsUpdated === 0) {
            return next({ status: 404, message: 'Meeting not found' });
        }
        
        const updatedMeeting = await Meeting.findByPk(meetingId);
        response.json(updatedMeeting);
    } catch (e) {
        next(e);
    }
}

export async function deleteMeeting(request: Request<{meetingId: string}, {}, {}>, response: Response, next: NextFunction) {
    try {
        const { meetingId } = request.params;
        const numberOfRowsDeleted = await Meeting.destroy({ where: { id: meetingId } });

        if (numberOfRowsDeleted === 0) {
            return next({ status: 404, message: 'Meeting not found' });
        }

        response.json({ success: true });
    } catch (e) {
        next(e);
    }
}