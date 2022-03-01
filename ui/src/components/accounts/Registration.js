import React, { useState } from "react";
import { USER_SERVICE_URL } from "../../services/urls";

function Registration() {
  const [user, setUser] = useState({
    membershipId: 0,
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);

  function handleChange(event) {
    const clone = { ...user };
    clone[event.target.name] = event.target.value;
    setUser(clone);
  }

  function handleClick(event) {
    // perform all neccessary validations
    if (user.password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      fetch(`${USER_SERVICE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.status === 201) {
            return Promise.resolve;
          } else {
            return Promise.reject;
          }
        })
        .catch((error) => {
          setErrors([error]);
        });
    }
    event.preventDefault();
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleClick}>
        <div className="row">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="email@example.com"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
              />
              <br />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <br />
              <button className="btn btn-primary" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="phone">Phone Number: </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="1234567890"
              />
              <br />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="1234 Drury Ln"
              />
              <br />
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
              />
              <br />
              <label htmlFor="state">State</label>
              <select className="form-control" id="state" name="state">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <br />
              <label htmlFor="zip">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                placeholder="12345"
              />
              <br />
              <label htmlFor="membership">Membership</label>
              <select
                className="form-control"
                id="membership"
                name="membership"
              >
                <option value="1">Gold ($100/mo)</option>
                <option value="2">Silver ($50/mo)</option>
                <option value="3">Bronze ($25/mo)</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Registration;
