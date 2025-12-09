import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";

export default function NewUser() {
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
  const token = user.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      await axios.post(`http://127.0.0.1:8000/api/user/create`, form, {
        headers: { Authorization: "Bearer " + token },
      });
      nav("/dashboard/users");
    } catch (err) {
      if (err.response.data.message === "The email has already been taken.") {
        setEmailError(true);
      }
    }
  }

  return (
    <div className="outlet">
      <div className="parent">
        <form onSubmit={Submit}>
          <h3>Create User</h3>
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
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
