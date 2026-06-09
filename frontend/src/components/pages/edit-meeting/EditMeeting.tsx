import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMeetings } from '../../meetings-context/MeetingsContext';
import type MeetingDraft from '../../../models/MeetingDraft';
import { getMeetingById, updateMeeting } from '../../../services/meetings';
import './EditMeeting.css';

export default function EditMeeting() {
    const { teams } = useMeetings();
    const { id } = useParams(); 
    const navigate = useNavigate();
    const meetingId = Number(id);

    const { 
        register, 
        handleSubmit, 
        watch, 
        reset, 
        formState: { errors, isDirty } 
    } = useForm<MeetingDraft>();

    const startTimeValue = watch('startTime');

    useEffect(() => {
        if (!meetingId) return;
        
        (async () => {
            try {
                const meeting = await getMeetingById(meetingId);

                const draft: MeetingDraft = {
                    teamId: meeting.teamId,
                    startTime: new Date(meeting.startTime).toISOString().slice(0, 16),
                    endTime: new Date(meeting.endTime).toISOString().slice(0, 16),
                    description: meeting.description,
                    room: meeting.room,
                };

                reset(draft); 

            } catch (e) {
                alert(e);
            }
        })();
    }, [meetingId, reset]);    

    async function submit(draft: MeetingDraft) {
        if (!meetingId) return;

        if (!isDirty) {
            alert("You didn't change anything.");
            return;
        }

        try {
            const payload: MeetingDraft = {
                ...draft,
                startTime: new Date(draft.startTime).toISOString(),
                endTime: new Date(draft.endTime).toISOString(),
            };

            await updateMeeting(meetingId, payload);
            alert('Meeting updated successfully!');
            navigate('/meetings');
        } catch (e) {
            alert(e);
        }
    }

    // ... your JSX remains exactly the same ...
    
    return (
        <div className="EditMeeting">
            <h2>Edit Meeting</h2>
            <form className="edit-form" onSubmit={handleSubmit(submit)}>
                
                <div className="form-group">
                    <label>Team</label>
                    <select {...register('teamId', { required: "Team is required", valueAsNumber: true })}>
                        <option value={0} disabled>Select Team</option>
                        {teams.map(({ id: teamId, name }) => (
                            <option key={teamId} value={teamId}>{name}</option>
                        ))}
                    </select>
                    {errors.teamId && <span className="error">{errors.teamId.message}</span>}
                </div>

                <div className="form-group">
                    <label>Start Time</label>
                    <input 
                        type="datetime-local" 
                        {...register('startTime', { 
                            required: "Start time is required"
                        })} 
                    />
                    {errors.startTime && <span className="error">{errors.startTime.message}</span>}
                </div>

                <div className="form-group">
                    <label>End Time</label>
                    <input 
                        type="datetime-local" 
                        {...register('endTime', { 
                            required: "End time is required",
                            validate: value => !startTimeValue || new Date(value) > new Date(startTimeValue) || "End time must be after start time"
                        })} 
                    />
                    {errors.endTime && <span className="error">{errors.endTime.message}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input 
                        placeholder="Meeting Description" 
                        {...register('description', { required: "Description is required" })} 
                    />
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>

                <div className="form-group">
                    <label>Room</label>
                    <input 
                        placeholder="Room Name" 
                        {...register('room', { required: "Room is required" })} 
                    />
                    {errors.room && <span className="error">{errors.room.message}</span>}
                </div>

                <div className="form-actions">
                    <button type="button"  onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit">Update Meeting</button>
                </div>
            </form>
        </div>
    );
}
