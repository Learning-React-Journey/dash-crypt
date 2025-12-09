import { NavLink } from "react-router-dom";
import "./side-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <div className="side-bar">
      <ul>
        <li>
          <NavLink to="/dashboard/users">
            <FontAwesomeIcon icon={faUsers} color="#2c9e2c" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/user/create">
            <FontAwesomeIcon icon={faUserPlus} color="#2c9e2c" />
            <span>New User</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
