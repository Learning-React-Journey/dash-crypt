import { useContext, useEffect, useState } from "react";
import "./users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import {User} from "../../../Context/UserContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const user = useContext(User);
  const token = user.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [refresh, token]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,{headers:{
          Authorization:"Bearer " + token,
        }}
      );
      if (res.status === 200) {
        setRefresh((prev) => !prev);
      }
    } catch {
      console.log("none");
    }
  }

  const showUsers = users.map((user, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div className="actions">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon icon={faEdit} color="#2c9e2c" />
          </Link>
          <FontAwesomeIcon
            onClick={() => deleteUser(user.id)}
            icon={faTrash}
            color="red"
          />
        </div>
      </td>
    </tr>
  ));
  return (
    <div className="users">
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
