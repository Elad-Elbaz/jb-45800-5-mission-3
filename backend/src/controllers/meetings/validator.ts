import Joi from "joi";

export const getMeetingsByTeamValidator = Joi.object({
    teamId: Joi.number().integer().positive().required()
});

export const getMeetingByIdValidator = Joi.object({
    meetingId: Joi.number().integer().positive().required()
});

export const newMeetingValidator = Joi.object({
    teamId: Joi.number().integer().positive().required(),
    startTime: Joi.date().iso().min('now').required(),
    endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
    description: Joi.string().required(),
    room: Joi.string().required()
});

export const updateMeetingValidator = Joi.object({
    teamId: Joi.number().integer().positive().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
    description: Joi.string().required(),
    room: Joi.string().required()
});

export const deleteMeetingValidator = Joi.object({
    meetingId: Joi.number().integer().positive().required()
});