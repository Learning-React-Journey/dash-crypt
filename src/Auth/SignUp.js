import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nav = useNavigate();
  const user = useContext(User);

  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/register`, form);
      const token = res.data.data.token;
      cookie.set("Bearer", token, {path:"/"});
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
    }
  }

  return (
    <div className="parent">
      <form onSubmit={Submit}>
        <h3>Signup</h3>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {form.name.length === 0 && accept && (
            <p className="error">Username is required</p>
          )}
        </div>
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
          {emailError && accept && (
            <p className="error">This email has already been taken</p>
          )}
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
        <div className="field">
          <label htmlFor="r-password">Repeat Password</label>
          <input
            id="r-password"
            type="password"
            placeholder="Repeat Password..."
            value={form.password_confirmation}
            onChange={(e) =>
              setForm({ ...form, password_confirmation: e.target.value })
            }
          />
          {form.password_confirmation !== form.password && accept && (
            <p className="error">Doesn't match password</p>
          )}
        </div>
        <button type="submit" className="btn signup-button">
          Sign up
        </button>
      </form>
    </div>
  );
}
