import { useState, useEffect } from 'react';
import { useMeetings } from '../../meetings-context/MeetingsContext';
import type Meeting from '../../../models/Meeting';
import { getMeetingsByTeam } from '../../../services/meetings';
import MeetingCard from '../meeting-card/MeetingCard';
import './Meetings.css';

export default function Meetings() {
    const { teams, isLoading, error } = useMeetings(); 
    const [selectedTeamId, setSelectedTeamId] = useState<string>('');
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        if (!selectedTeamId) return;
        
        (async () => {
            try {
                const results = await getMeetingsByTeam(Number(selectedTeamId));
                setMeetings(results);
            } catch (e) {
                alert(e);
            }
        })();
    }, [selectedTeamId]);

    function meetingDeleted(id: number) {
        setMeetings(meetings.filter(m => m.id !== id));
    }

    if (isLoading) return <div className="Meetings"><p>Loading development teams...</p></div>;
    if (error) return <div className="Meetings"><p className="error">{error}</p></div>;

    return (
        <div className="Meetings">
            <div className="team-selector">
                <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}>
                    <option value="" disabled>Select a Development Team</option>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>

            {selectedTeamId && (
                <div className="results-container">
                    {meetings.length === 0 ? (
                        <p>No meetings found for this team.</p>
                    ) : (
                        meetings.map(meeting => (
                            <MeetingCard
                                key={meeting.id}
                                meeting={meeting}
                                meetingDeleted={meetingDeleted}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}