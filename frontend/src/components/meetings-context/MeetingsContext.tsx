import { createContext, useContext } from "react";
import type Team from "../../models/Team";

interface MeetingsContextType {
    teams: Team[];
    isLoading: boolean;
    error: string | null;
}

export const MeetingsContext = createContext<MeetingsContextType | undefined>(undefined);

export function useMeetings() {
    const context = useContext(MeetingsContext);
    if (context === undefined) {
        throw new Error("useMeetings must be used within a MeetingsProvider");
    }
    return context;
}