import { useState, useEffect } from "react";

function UserReservations() {
  const [errors, setErrors] = useState([]);
  const [view, setView] = useState("Main");
  const [reservations, setReservations] = useState([]);

  useEffect((appUserId) => {
    fetch(`${window.FACILITY_SERVICE_URL}/reservations/${appUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((errors) => console.log(errors));
  }, []);

  const deleteReservation = (appUserId, reservation) => {
    fetch(`http://localhost:8081/reservations/${appUserId}/${reservation}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const filteredReservations = reservations.filter(
            (reservation) => reservation.reservationId !== reservation
          );
          setReservations(filteredReservations);
          <div class="alert alert-success" role="alert">
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
    return reservations.map((reservation) => (
      <li key={reservation.reservationId}>
        <div className="col-2">
          <span
            className="clickable"
            onClick={() => deleteReservation(reservation.reservationId)}
          >
            🗑️
          </span>
        </div>
      </li>
    ));
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
      {renderReservations}
    </>
  );
}

export default UserReservations;
