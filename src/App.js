import { Route, Routes } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Home from "./Pages/Home";
import Dashboard from "./Dashboard/Dashboard";
import DashboardLayout from "./Dashboard/DashboardLayout";
import PublicLayout from "./Layouts/PublicLayout";
import Users from "./Dashboard/Pages/Users/Users";
import Update from "./Dashboard/Pages/Update";
import NewUser from "./Dashboard/Pages/NewUser";
import AuthRequire from "./Auth/AuthRequire";
import PresistLogin from "./Auth/PresistLogin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PresistLogin />}>
          <Route element={<AuthRequire />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<Update />} />
                <Route path="user/create" element={<NewUser />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
