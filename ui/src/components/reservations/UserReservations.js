
import { useState, useEffect } from "react";

function UserReservations() {

    const [ errors, setErrors ] = useState([]);
    const [ view, setView ] = useState("Main");
    const [ reservations, setReservations ] = useState([]);

//ALL HTTP REQUESTS ARE PLACEHOLDERS, DOUBLE CHECK TO MAKE SURE THEY ARE ACCURATE
    useEffect(() => {
        fetch("http://localhost:8080/user/reservations", {
         method: "GET",
         headers: {
         "Authorization": `Bearer ${localStorage.getItem("token")}`, 
        },
    })
    .then(response => response.json())
    .then(data => setReservations(data))
    .catch(errors => console.log(errors));
    }, []);


    const deleteReservation = (reservationId) => {

        fetch( `http://localhost:8080/user/${reservationId}`, { method: "DELETE" } )

        .then(response => {
            if(response.status === 204) {
                const filteredReservations = reservations.filter(reservation => reservation.reservationId !== reservationId);
                setReservations(filteredReservations);
                <div class="alert alert-success" role="alert">
                Reservation successfully deleted
                </div>

            } else if(response.status === 404) {
                return Promise.reject("Reservation not found");

            } else {
                return Promise.reject(`Delete failed with status: ${response.status}`);
            }
        })
        .catch(console.log)
    }

    const renderErrors = () => {
        return errors.map (error => <li key={error}>{error}</li>)
    }

    return ( 
        <>

        {(errors.length > 0) && (
            <div className="alert alert-danger">
                <ul>
                    {renderErrors()}
                </ul>
            </div>
        )};

        <h1>My Reservations</h1>
        </>
     );
}

export default UserReservations;