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
      <div className={"card-group"}>
        <div className={"card bg-dark text-white"}>
          <img
            src={
              "https://post.healthline.com/wp-content/uploads/2020/09/woman-doing-push-ups-on-mat-732x549-thumbnail-732x549.jpg"
            }
            className={"card-img opacity-50"}
            alt={"yoga girl"}
          />
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
        <div className={"card bg-dark text-white"}>
          <img
            src={
              "https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2VpZ2h0JTIwcm9vbXxlbnwwfHwwfHw%3D&w=1000&q=80"
            }
            className={"card-img opacity-50"}
            alt={"yoga girl"}
          />
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body">
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul>{renderErrors()}</ul>
                  </div>
                )}
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
            </div>
          </div>
        </div>
        <div className={"card bg-dark text-white"}>
          <img
            src={
              "https://www.familyfuntwincities.com/wp-content/uploads/2020/07/grove-aquatic-center.jpg"
            }
            className={"card-img opacity-50"}
            alt={"yoga girl"}
          />
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
      <div className={"card-group"}>
        <div className={"card bg-dark text-white"}>
          <img
            src={
              "https://images.squarespace-cdn.com/content/v1/54beb580e4b00cf9dcf08db8/1498259961131-L11YYWPW2B9I8712HR50/gym+wide+2017.png?format=750w"
            }
            className={"card-img opacity-50"}
            alt={"yoga girl"}
          />
          <div className={"card-img-overlay"}></div>
        </div>
      </div>
    </>
  );
}

export default Login;
