import type MeetingDraft from "./MeetingDraft";
import type Team from "./Team";

export default interface Meeting extends MeetingDraft {
    id: number;
    team: Team;
}