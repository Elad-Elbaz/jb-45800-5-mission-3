import { Router } from "express";
import paramsValidation from "../middlewares/params-validation";
import bodyValidation from "../middlewares/body-validation";
import { getMeetingsByTeamValidator, getMeetingByIdValidator, newMeetingValidator, updateMeetingValidator, deleteMeetingValidator } from "../controllers/meetings/validator";
import { getMeetingsByTeam, getMeetingById, newMeeting, updateMeeting, deleteMeeting } from "../controllers/meetings/controller";

const meetingsRouter = Router();

meetingsRouter.get('/team/:teamId', paramsValidation(getMeetingsByTeamValidator), getMeetingsByTeam);
meetingsRouter.get('/:meetingId', paramsValidation(getMeetingByIdValidator), getMeetingById);
meetingsRouter.post('/', bodyValidation(newMeetingValidator), newMeeting);
meetingsRouter.put('/:meetingId', paramsValidation(getMeetingByIdValidator), bodyValidation(updateMeetingValidator), updateMeeting);
meetingsRouter.delete('/:meetingId', paramsValidation(deleteMeetingValidator), deleteMeeting);

export default meetingsRouter;