import { useNavigate } from 'react-router-dom';
import type Meeting from '../../../models/Meeting';
import { deleteMeeting } from '../../../services/meetings';
import './MeetingCard.css';

interface MeetingCardProps {
    meeting: Meeting;
    meetingDeleted: (id: number) => void;
}

export default function MeetingCard(props: MeetingCardProps) {
    const { meeting: { id, description, room, startTime, endTime }, meetingDeleted } = props;
    const navigate = useNavigate();

    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    
    const isFuture = start > now;
    const isPast = start <= now;

    const colorClass = isFuture ? 'future-meeting' : (isPast ? 'past-meeting' : '');

    const durationMs = end.getTime() - start.getTime();
    const durationMins = Math.round(durationMs / 60000);
    const hours = Math.floor(durationMins / 60);
    const minutes = durationMins % 60;
    const durationDisplay = `${hours}h ${minutes}m`;

    async function deleteMe() {
        try {
            if (confirm('Are you sure you want to delete this meeting?')) {
                await deleteMeeting(id);
                meetingDeleted(id);
            }
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className={`MeetingCard ${colorClass}`}>
            <h3>{room}</h3>
            <div className="meeting-details">
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Start:</strong> {start.toLocaleString()}</p>
                <p><strong>End:</strong> {end.toLocaleString()}</p>
                <p><strong>Duration:</strong> {durationDisplay}</p>
            </div>
            <div className="actions">
                <button className="edit-btn" onClick={() => navigate(`/edit-meeting/${id}`)}>Edit</button>
                <button className="delete-btn" onClick={deleteMe}>Delete</button>
            </div>
        </div>
    );
}