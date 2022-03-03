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

  useEffect(() => {
    fetch(`${window.USER_SERVICE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((errors) => console.log(errors));
  }, []);

  //edit a member
  const editUser = (userId) => {
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

  //adding + editing members
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

      console.log(editUserObject)

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
              (user) => user.userId === editingUserId
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

  //View all members
  const renderUsers = () => {
    return users.map((user) => (
      <li key={user.userId}>
        <div className="row">
          <div className="col-8">
            {user.firstName}
            <span> </span>
            {user.lastName}
          </div>
          <div className="col-2">
            <span className="clickable" onClick={() => editUser(user.UserId)}>
              ✏️
            </span>
          </div>
        </div>
      </li>
    ));
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
                              i === 0
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
                              value={authorities?.includes("ADMIN") ? "admin" : "user"}
                              className="form-control"
                              id="authorities"
                              name="authorities"
                              onChange={(event) =>{
                                  console.log(authorities)
                                  const newAuthorities = event.target.value === "user" ? 
                                      ["USER"] : ["USER", "ADMIN"]
                                  setAuthorities(newAuthorities)
                                }
                              }
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
                            <input
                              className="form-control"
                              maxLength="2"
                              id="state"
                              name="state"
                              type="text"
                              value={state}
                              onChange={(event) => setState(event.target.value)}
                            />
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
