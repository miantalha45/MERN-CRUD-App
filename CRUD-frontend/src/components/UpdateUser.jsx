import { useState } from "react";
import { base_URL } from "../config";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateUser() {
  const params = useParams();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(base_URL + "user/" + params.id);
      const data = response.data;
      setName(data.Name);
      setEmail(data.Email);
      setAge(data.Age);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        _id: params.id,
        Name,
        Email,
        Age,
      };
      console.log(data);
      const response = await axios.patch(base_URL + "user", data);
      alert(response.data.success);
      console.log(response);
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={onSubmit}>
          <h2>Update User</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              name="Age"
              className="form-control"
              id="exampleInputPassword1"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
