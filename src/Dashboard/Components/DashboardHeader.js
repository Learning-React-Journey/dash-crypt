import { Link } from "react-router-dom";
import "../../Components/Header/header-common.css";

export default function DashboardHeader() {
  return (
    <nav>
      <div className="container nav-content">
        <h2>Dashboard</h2>
        <Link to={"/"} className="btn">
          Go to website
        </Link>
      </div>
    </nav>
  );
}
