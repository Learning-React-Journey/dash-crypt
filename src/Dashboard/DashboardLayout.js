import { Outlet } from "react-router-dom";
import DashboardHeader from "./Components/DashboardHeader";

export default function DashboardLayout(){
    return(
        <div>
            <DashboardHeader />
            <Outlet />
        </div>
    )
}