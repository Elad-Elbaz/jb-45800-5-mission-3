import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type Team from "../../models/Team";
import { getAllTeams } from "../../services/teams";
import { MeetingsContext } from "./MeetingsContext";

export function MeetingsProvider({ children }: { children: ReactNode }) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        getAllTeams()
            .then((data) => {
                if (!cancelled) {
                    setTeams(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error("Failed to fetch teams:", err);
                    setError("Failed to load meetings. Please try again later.");
                    setIsLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <MeetingsContext.Provider value={{ teams, isLoading, error }}>
            {children}
        </MeetingsContext.Provider>
    );
}