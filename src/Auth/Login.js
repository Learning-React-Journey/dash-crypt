import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [accept, setAccept] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);

  const user = useContext(User);
  const nav = useNavigate();

  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const res = await axios.post("https://boreable-lavina-nonprofitablely.ngrok-free.dev/api/login", form);
      const token = res.data.data.token;
      cookie.set("Bearer", token,{path:"/"});
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setAuthenticated(false);
      }
    }
  }
  return (
    <div className="parent">
      <form onSubmit={Submit}>
        <h3>Login</h3>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password..."
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {form.password.length < 8 && accept && (
            <p className="error">Password must be more than 8 char</p>
          )}
        </div>
        {!authenticated && accept && (
          <p className="error">Email or Password not correct</p>
        )}
        <button type="submit" className="btn Login-button">
          Log in
        </button>
      </form>
    </div>
  );
}
