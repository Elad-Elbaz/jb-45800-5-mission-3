import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMeetings } from '../../meetings-context/MeetingsContext';
import type MeetingDraft from '../../../models/MeetingDraft';
import { newMeeting } from '../../../services/meetings';
import './AddMeeting.css';

export default function AddMeeting() {
    const { teams } = useMeetings();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<MeetingDraft>();
    const navigate = useNavigate();

    const startTimeValue = watch('startTime');

    async function submit(draft: MeetingDraft) {
        try {
            const payload: MeetingDraft = {
                ...draft,
                startTime: new Date(draft.startTime).toISOString(),
                endTime: new Date(draft.endTime).toISOString(),
            };

            await newMeeting(payload);
            alert('Meeting added successfully!');
            navigate('/meetings');
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="AddMeeting">
            <h2>Add a New Meeting</h2>
            <form className="add-form" onSubmit={handleSubmit(submit)}>
                
                <div className="form-group">
                    <label>Team</label>
                    <select defaultValue={0} {...register('teamId', { required: "Team is required", valueAsNumber: true })}>
                        <option value={0} disabled>Select Team</option>
                        {teams.map(({ id, name }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                    {errors.teamId && <span className="error">{errors.teamId.message}</span>}
                </div>

                <div className="form-group">
                    <label>Start Time</label>
                    <input 
                        type="datetime-local" 
                        {...register('startTime', { 
                            required: "Start time is required",
                            validate: value => new Date(value) > new Date() || "Start time cannot be in the past"
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

                <button type="submit">Save Meeting</button>
            </form>
        </div>
    );
}