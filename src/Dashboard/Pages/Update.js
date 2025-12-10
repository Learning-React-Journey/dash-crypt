import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../Context/UserContext";

export default function Update() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const { id } = useParams();
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nav = useNavigate();
  const user = useContext(User);
  const token = user.auth.token;

  useEffect(() => {
    fetch(
      `https://boreable-lavina-nonprofitablely.ngrok-free.dev/api/user/showbyid/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "ngrok-skip-browser-warning": "true",
        },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        setForm({
          name: data[0].name,
          email: data[0].email,
          password: "",
          password_confirmation: "",
        })
      );
  }, [id, token]);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      await axios.post(
        `https://boreable-lavina-nonprofitablely.ngrok-free.dev/api/user/update/${id}`,
        form,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
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
          <h3>Update User</h3>
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
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
