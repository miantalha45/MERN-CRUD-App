import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base_URL } from "../config";

function User() {
  const [users, setUsers] = useState([
    {
      Name: "Talha",
      Email: "myown4500@gmail.com",
      Age: 19,
    },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const users = await axios.get(base_URL + "user");
      setUsers(users.data);
      console.log(users);
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = async (ID) => {
    try {
      const data = {
        _id: ID,
      };
      console.log(data);
      const response = await axios.delete(base_URL + "user/" + ID);
      alert(response.data.success);
      console.log(response);
      getUser();
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          + New
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Age}</td>
                <td>
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
