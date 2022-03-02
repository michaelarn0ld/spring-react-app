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
    setView("Edit");
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.userId === userId);
    setUsername(userToEdit.username);
    setAuthorities(userToEdit.authorities);
    setFirstName(userToEdit.firstName);
    setLastName(userToEdit.lastName);
    setMembershipId(userToEdit.membershipId);
    setEmail(userToEdit.email);
    setPhone(userToEdit.phone);
    setAddress(userToEdit.address);
    setCity(userToEdit.city);
    setState(userToEdit.state);
    setZipCode(userToEdit.zipCode);
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

      const initUpdate = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer {{jwt}}",
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
                        <div key={user.userId} className="accordion-item">
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
                                onClick={() => editUser(user.UserId)}
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
                    <div className="row">
                      <div className="column">
                        <form onSubmit={onSubmit}>
                          <label htmlFor="email">Email:</label>
                          <input
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <br />
                          <label htmlFor="username">Username:</label>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                          <br />
                          <label htmlFor="firstName">First Name:</label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                          />
                          <br />
                          <label htmlFor="lastName">Last Name:</label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                          />
                          <br />
                          <label htmlFor="phone">Phone:</label>
                          <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                          />
                          <br />
                          <label htmlFor="address">Address:</label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                          />
                          <br />
                          <label htmlFor="city">City:</label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                          />
                          <br />
                          <label htmlFor="state">State:</label>
                          <input
                            maxLength="2"
                            id="state"
                            name="state"
                            type="text"
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                          />
                          <br />
                          <label htmlFor="zipCode">Zip Code:</label>
                          <input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            value={zipCode}
                            onChange={(event) => setZipCode(event.target.value)}
                          />
                          <br />
                          <div>
                            <h3>Membership:</h3>
                            <div className="radio">
                              <input
                                id="rdBronzeMembership"
                                name="membershipId"
                                type="radio"
                                value="1"
                                checked={membershipId === "1"}
                                onChange={(event) =>
                                  setMembershipId(event.target.value)
                                }
                              />
                              <label htmlFor="rdBronzeMembership">Bronze</label>
                            </div>
                            <div className="radio">
                              <input
                                id="rdSilverMembership"
                                name="membershipId"
                                type="radio"
                                value="2"
                                checked={membershipId === "2"}
                                onChange={(event) =>
                                  setMembershipId(event.target.value)
                                }
                              />
                              <label htmlFor="rdSilverMembership">Silver</label>
                            </div>
                            <div className="radio">
                              <input
                                id="rdGoldMembership"
                                name="membershipId"
                                type="radio"
                                value="3"
                                checked={membershipId === "3"}
                                onChange={(event) =>
                                  setMembershipId(event.target.value)
                                }
                              />
                              <label htmlFor="rdGoldMembership">Gold</label>
                            </div>
                          </div>
                          <br />
                          <div>
                            <h3>Authorities:</h3>
                            <div className="checkbox">
                              <input
                                id="chkUser"
                                name="authorities"
                                type="checkbox"
                                value="USER"
                                onChange={(event) =>
                                  setAuthorities(event.target.value)
                                }
                              />
                              <label htmlFor="chkUser">User</label>
                            </div>
                            <div className="checkbox">
                              <input
                                id="chkAdmin"
                                name="authorities"
                                type="checkbox"
                                value="ADMIN"
                                onChange={(event) =>
                                  setAuthorities(event.target.value)
                                }
                              />
                              <label htmlFor="chkAdmin">Admin</label>
                            </div>
                          </div>
                          <button type="button" onClick={cancelButton}>
                            Cancel
                          </button>
                          <button type="submit">Update</button>
                        </form>
                      </div>
                    </div>
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
