import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

export default function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
