import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
