import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <div className="Header">
            <h1>Dev Teams Meetings</h1>
            <nav className="menu">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/meetings">Meetings</NavLink>
                <NavLink to="/add-meeting">Add Meeting</NavLink>
            </nav>
        </div>
    );
}