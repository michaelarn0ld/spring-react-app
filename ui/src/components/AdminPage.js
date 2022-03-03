import { useState, useEffect } from "react";
import "./styles.css";

function AdminPage() {
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [authorities, setAuthorities] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [membershipId, setMembershipId] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [editingUserId, setEditingUserId] = useState(NaN);
  const [view, setView] = useState("Main");
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    fetch(`${window.USER_SERVICE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setCurrentUserIndex(
          data.findIndex((user) => user.id === currentUserId)
        );
      })
      .catch((error) => console.log(error));
  }, [view]);

  //edit a member
  const editUser = (userId) => {
    setCurrentUserId(userId);
    const initEdit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${window.USER_SERVICE_URL}/user/${userId}`, initEdit)
      .then((res) => res.json())
      .then((data) => {
        setView("Edit");
        setEditingUserId(data.id);
        setUsername(data.username);
        setAuthorities(data.authorityNames);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMembershipId(data.membershipId);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setZipCode(data.zipCode);
      });
  };

  //editing members
  const onSubmit = (event) => {
    event.preventDefault();

    if (!isNaN(editingUserId)) {
      const editUserObject = {
        id: editingUserId,
        membershipId,
        email,
        username,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        authorities,
      };

      console.log(editUserObject);

      const initUpdate = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editUserObject),
      };

      fetch(`${window.USER_SERVICE_URL}/user/update`, initUpdate)
        .then((response) => {
          if (response.status === 204) {
            return null;
          } else if (response.status === 400) {
            return response.json();
          }
          return Promise.reject("Unexpected response from the server");
        })
        .then((data) => {
          if (!data) {
            const editingUsers = [...users];
            const indexOfEdit = editingUsers.findIndex(
              (user) => user.id === editingUserId
            );

            editingUsers[indexOfEdit] = editUserObject;
            setUsers(editingUsers);
            setEditingUserId(NaN);
            setErrors([]);
            setView("Main");
            setMembershipId(0);
            setEmail("");
            setUsername("");
            setFirstName("");
            setLastName("");
            setPhone("");
            setAddress("");
            setCity("");
            setState("");
            setZipCode("");
            setAuthorities([]);
          }
        });
    }
  };

  //cancel button
  const cancelButton = () => {
    setEditingUserId(NaN);
    setErrors([]);
    setUsername("");
    setAuthorities([]);
    setFirstName("");
    setLastName("");
    setMembershipId(0);
    setEmail("");
    setPhone("");
    setView("Main");
  };

  //displaying errors
  const renderErrors = () => {
    return errors.map((error) => <li key={error}>{error}</li>);
  };

  return (
    <div className={"card-group"}>
      <div className={"card bg-dark text-black"}>
        <img
          src={
            "https://post.healthline.com/wp-content/uploads/2020/09/woman-doing-push-ups-on-mat-732x549-thumbnail-732x549.jpg"
          }
          className={"card-img opacity-50"}
          alt={"yoga girl"}
        />

        <div className={"card-img-overlay"}>
          <div className="card-title">
            <div className="card-body">
              <>
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul>{renderErrors()}</ul>
                  </div>
                )}
                {view === "Main" && (
                  <>
                    <h1 className="text-center display-1 text-white">
                      Members
                    </h1>
                    <div className="accordion text-center" id="usersAccordion">
                      {users.map((user, i) => (
                        <div key={user.id} className="accordion-item">
                          <h2 className="accordion-header" id={`heading${i}`}>
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${i}`}
                              aria-expanded="true"
                              aria-controls={`collapse${i}`}
                            >
                              {user.firstName} {user.lastName}
                            </button>
                          </h2>
                          <div
                            id={`collapse${i}`}
                            className={
                              i === currentUserIndex
                                ? "accordion-collapse collapse show"
                                : "accordion-collapse collapse"
                            }
                            aria-labelledby={`heading${i}`}
                            data-bs-parent="#usersAccordion"
                          >
                            <div className="accordion-body">
                              <div className="row">
                                <div className="col-3 text-center">
                                  <strong>Email</strong> <br />
                                  {user.email}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>Username</strong> <br />
                                  {user.username}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>Phone</strong> <br />
                                  {user.phone}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>Address</strong> <br />
                                  {user.address}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>City</strong> <br />
                                  {user.city}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>State</strong> <br />
                                  {user.state}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>Zip Code</strong> <br />
                                  {user.zipCode}
                                </div>

                                <div className="col-3 text-center">
                                  <strong>Membership Id</strong> <br />
                                  {user.membershipId}
                                </div>
                              </div>

                              <div className="row"></div>

                              <button
                                className="onClick"
                                onClick={() => {
                                  editUser(user.id);
                                }}
                              >
                                ✏️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {view === "Edit" && (
                  <>
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="username">Username</label>
                            <input
                              className="form-control"
                              id="username"
                              name="username"
                              type="text"
                              value={username}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                            />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label htmlFor="firstName">First Name</label>
                            <input
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={firstName}
                              onChange={(event) =>
                                setFirstName(event.target.value)
                              }
                            />
                            <br />

                            <label htmlFor="lastName">Last Name</label>
                            <input
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={lastName}
                              onChange={(event) =>
                                setLastName(event.target.value)
                              }
                            />
                            <br />

                            <label htmlFor="email">Email</label>
                            <input
                              className="form-control"
                              id="email"
                              name="email"
                              type="text"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                            <br />

                            <label htmlFor="membershipId">Membership</label>
                            <select
                              value={membershipId}
                              className="form-control"
                              id="membershipId"
                              name="membershipId"
                              onChange={(event) =>
                                setMembershipId(parseInt(event.target.value))
                              }
                              defaultValue={membershipId}
                            >
                              <option value={1}>Gold ($100/mo)</option>
                              <option value={2}>Silver ($50/mo)</option>
                              <option value={3}>Bronze ($25/mo)</option>
                            </select>
                            <br />

                            <label htmlFor="authorities">Authorities</label>
                            <select
                              value={
                                authorities?.includes("ADMIN")
                                  ? "admin"
                                  : "user"
                              }
                              className="form-control"
                              id="authorities"
                              name="authorities"
                              onChange={(event) => {
                                console.log(authorities);
                                const newAuthorities =
                                  event.target.value === "user"
                                    ? ["USER"]
                                    : ["USER", "ADMIN"];
                                setAuthorities(newAuthorities);
                              }}
                            >
                              <option value="user">USER</option>
                              <option value="admin">ADMIN</option>
                            </select>
                          </div>

                          <div className="col-6">
                            <label htmlFor="phone">Phone</label>
                            <input
                              className="form-control"
                              id="phone"
                              name="phone"
                              type="text"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                            />
                            <br />
                            <label htmlFor="address">Address</label>
                            <input
                              className="form-control"
                              id="address"
                              name="address"
                              type="text"
                              value={address}
                              onChange={(event) =>
                                setAddress(event.target.value)
                              }
                            />
                            <br />
                            <label htmlFor="city">City</label>
                            <input
                              className="form-control"
                              id="city"
                              name="city"
                              type="text"
                              value={city}
                              onChange={(event) => setCity(event.target.value)}
                            />
                            <br />
                            <label htmlFor="state">State</label>
                            <select
                              value={state}
                              className="form-control"
                              id="state"
                              name="state"
                              onChange={(event) => setState(event.target.value)}
                            >
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
                            <label htmlFor="zipCode">Zip Code</label>
                            <input
                              className="form-control"
                              id="zipCode"
                              name="zipCode"
                              type="text"
                              value={zipCode}
                              onChange={(event) =>
                                setZipCode(event.target.value)
                              }
                            />
                            <br />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6">
                            <button
                              className="btn btn-danger form-control"
                              type="button"
                              onClick={cancelButton}
                            >
                              Cancel
                            </button>
                          </div>

                          <div className="col-6">
                            <button
                              className="btn btn-primary form-control"
                              type="submit"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
