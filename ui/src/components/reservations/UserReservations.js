import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

function UserReservations() {
  const [errors, setErrors] = useState([]);
  const [view, setView] = useState("Main");
  const [reservations, setReservations] = useState([]);
  const [userStatus, setUserStatus] = useContext(AuthContext);

  useEffect(() => {
    userStatus &&
      fetch(
        `${window.FACILITY_SERVICE_URL}/reservations/${userStatus.user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setReservations(data);
        })
        .catch((errors) => console.log(errors));
  }, [userStatus]);

  const deleteReservation = (reservation) => {
    fetch(
      `${window.FACILITY_SERVICE_URL}/reservations/${userStatus.user.id}/${reservation}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          const filteredReservations = reservations.filter(
            (r) => r.id !== reservation
          );
          setReservations(filteredReservations);
          <div className="alert alert-success" role="alert">
            Reservation successfully deleted
          </div>;
        } else if (response.status === 404) {
          return Promise.reject("Reservation not found");
        } else {
          return Promise.reject(
            `Delete failed with status: ${response.status}`
          );
        }
      })
      .catch(console.log);
  };

  const renderReservations = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Reservation ID</th>
            <th scope="col">Equipment ID</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations &&
            reservations.map((r) => (
              <tr>
                <td>{r.id}</td>
                <td>{r.equipmentId}</td>
                <td>{r.startTime}</td>
                <td>{r.endTime}</td>
                <td>
                  <div
                    className="btn btn-danger"
                    onClick={() => deleteReservation(r.id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
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

      <h1>My Reservations</h1>
      {renderReservations()}
    </>
  );
}

export default UserReservations;
