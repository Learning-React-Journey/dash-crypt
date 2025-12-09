import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-content">
      <SideBar />
      <Outlet />
    </div>
  );
}
