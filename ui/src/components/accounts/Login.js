import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../../context/AuthContext";
import { USER_SERVICE_URL } from "../../services/urls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [_, setUserStatus] = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      username,
      password,
    });
    console.log(body);
    const response = await fetch(`${USER_SERVICE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      const { jwt } = await response.json();

      localStorage.setItem("token", jwt);
      setUserStatus({ user: jwtDecode(jwt) });
      history.push("/");
    } else if (response.status === 400) {
      const errors = await response.json();
      setErrors(errors);
    } else if (response.status === 403) {
      setErrors(["Login failed."]);
    } else {
      setErrors(["Unknown error."]);
    }
  };

  const renderErrors = () => {
    return errors.map((error) => <li key={error}>{error}</li>);
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>{renderErrors()}</ul>
        </div>
      )}
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
