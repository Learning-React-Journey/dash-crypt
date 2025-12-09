import { Link, useNavigate } from "react-router-dom";
import "./header-common.css";
import "./header.css";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const nav = useNavigate();
  async function handleLogout() {
    try {
      const token = cookie.get("Bearer"); 
      if (token) {
        await axios.post("http://127.0.0.1:8000/api/logout", null, {
          headers: { Authorization: "Bearer " + token },
        });
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      cookie.remove("Bearer"); 
      nav("/");
    }
  }
  return (
    <nav>
      <div className="container nav-content">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>About</li>
        </ul>
        <div className="buttons">
          {!token ? (
            <>
              <Link to={"/signup"} className="btn ">
                Signup
              </Link>
              <Link to={"/login"} className="btn">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to={"/dashboard"} className="btn">
                Dashboard
              </Link>
              <div className="btn logout-btn" onClick={handleLogout}>
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
