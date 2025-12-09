import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import Cookies from "universal-cookie";
import axios from "axios";
import { User } from "../Context/UserContext";

export default function PresistLogin() {
  const [loading, setLoading] = useState(true);

  const user = useContext(User);
  const token = user.auth.token;
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  useEffect(() => {
    async function refresh() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/refresh",
          null,
          {
            headers: { Authorization: "Bearer " + getToken },
          }
        );
        cookie.set("Bearer", res.data.token, { path: "/" });
        user.setAuth({ userDetails: res.data.user, token: res.data.token });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (!token && getToken) {
      refresh();
    } else {
      setLoading(false);
    }
  }, []);
  return loading ? <Loading /> : <Outlet />;
}
