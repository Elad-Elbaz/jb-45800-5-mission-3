import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Meetings from "../../pages/meetings/Meetings";
import AddMeeting from "../../pages/add-meeting/AddMeeting";
import EditMeeting from "../../pages/edit-meeting/EditMeeting";
import { MeetingsProvider } from "../../meetings-context/MeetingProvider";

export default function Main() {
    return (
        <MeetingsProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/add-meeting" element={<AddMeeting />} />
                <Route path="/edit-meeting/:id" element={<EditMeeting />} />
            </Routes>
        </MeetingsProvider>
    );
}