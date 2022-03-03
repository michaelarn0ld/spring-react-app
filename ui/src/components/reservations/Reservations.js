import React, { useState, useContext } from "react";
import { render } from "react-dom";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import DatePicker from "react-date-picker";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../context/AuthContext";


function Reservations() {
  const { facility } = useParams();

  const history = useHistory();

  const [view, setView] = useState(facility);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState([]);
  const [userStatus, setUserStatus] = useContext(AuthContext);

  const handleScheduled = (dateTime) => {
    console.log("scheduled: ", dateTime);
  };

  const getAvailableReservations = (date, facility, reservable) => {
    let query = date.toISOString().substring(0,10)
    fetch(`${window.FACILITY_SERVICE_URL}/${facility}/${reservable}?date=${query}`)
      .then(res => res.json())
      .then(data => {
      const available = []
      Object.entries(data).forEach(e => {
        if (e[1]) {
          available.push(e)
        }
      })
      setOpen(available)
    })
  }

  const reserve = (time, facilityId, reservableId) => {
      let query = date.toISOString().substring(0,10)
      let endTime = new Date(`2020-02-20T${time}`)
      endTime.setHours(endTime.getHours() + 1 - 8)

      const reservation = {
        appUserId: userStatus.user.id,
        reservable: {
          id: reservableId
        },
        facility: {
          id: facilityId
        },
        startTime: `${query}T${time}:00`,
        endTime: `${query}T${endTime.toISOString().substring(11,16)}:00`
      }

      const init = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(reservation)
      }

      fetch(`${window.FACILITY_SERVICE_URL}/${facilityId}/${reservableId}`, init)
        .then(response => console.log(response))

  }

  const renderAvailable = (facility, reservable) => {
    return open.map(r => (
      <div className="btn btn-secondary" onClick={() => reserve(r[0], facility, reservable)}>{r[0]}</div>
    ))
  }

  const theme = {
    primary: "#141bde",
    secondary: "#a6aba6",
    background: "#fff", // This should match the container background
    buttons: {
      disabled: {
        color: "#333",
        background: "#d91111",
      },
      confirm: {
        color: "#fff",
        background: "#929692",
        hover: {
          color: "",
          background: "#36b33e",
        },
      },
    },
    feedback: {
      success: {
        color: "#29aba4",
      },
      failed: {
        color: "#eb7260",
      },
    },
  };

  const Container = styled.div`
    width: 475px;
    margin: 1em auto;
    padding: 1em;
    background-color: #fff;
    color: #333;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 2px 4px #00000018;
    @media (max-width: 520px) {
      width: 100%;
    }
  `;

  const toHome = () => {
    history.push("/");
  };

  //On click={setView"xxx"} wasnt working so I had to do this
  const toWeights = () => {
    return setView("Weights");
  };
  const toPool = () => {
    return setView("Pool");
  };
  const toTrack = () => {
    return setView("Track");
  };
  const toBenchPress = () => {
    return setView("Bench");
  };
  const toSquatRack = () => {
    return setView("Squat");
  };
  const toPoolLane = () => {
    return setView("Pool Lane");
  };
  const toTrackLane = () => {
    return setView("Track Lane");
  };

  return (
    <>
      {view === "Weights" && (
        <>
          <div className={"card-group text-center"}>
            <div className={"card bg-dark text-white"}>
              <img
                  src={"https://www.garagegymreviews.com/wp-content/uploads/Best-Univeristy-Football-Weight-Rooms.png"}
                  className={"card-img opacity-50 cards"}
                  alt={"track"}
              />
              <div className={"card-img-overlay"}>
                <div className={"card-title"}>
                  <div className={"card-body"}>
                    <h3 className={"text-center"}>What Would You Like to Reserve?</h3>
                    <button className="btn btn-primary" onClick={toBenchPress}>Bench Press</button>
                    <button className="btn btn-primary" onClick={toSquatRack}>Squat Rack</button>
                    <button className="btn btn-primary" onClick={toHome}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {view === "Pool" && (
        <>
          <div className={"card-group text-center"}>
            <div className={"card bg-dark text-white"}>
              <img
                  src={"https://cdn.hovia.com/app/uploads/swimming-lane-underwater-plain-1-820x532.jpg"}
                  className={"card-img opacity-50 cards"}
                  alt={"track"}
              />
              <div className={"card-img-overlay"}>
                <div className={"card-title"}>
                  <div className={"card-body"}>
                    <h3>What Would You Like to Reserve?</h3>
                    <button className="btn btn-primary" onClick={toPoolLane}>Pool Lane</button>
                    <button className="btn btn-primary" onClick={toHome}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {view === "Track" && (
        <>
          <div className={"card-group text-center"}>
            <div className={"card bg-dark text-white"}>
              <img
                  src={"https://www.ncaa.com/_flysystem/public-s3/images/2022/02/27/DII-IT%26F.JPG"}
                  className={"card-img opacity-50 cards"}
                  alt={"track"}
              />
              <div className={"card-img-overlay"}>
                <div className={"card-title"}>
                  <div className={"card-body"}>
                    <h3>What Would You Like to Reserve?</h3>
                    <button className="btn btn-primary" onClick={toTrackLane}>Track Lane</button>
                    <button className="btn btn-primary" onClick={toHome}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {view === "Bench" && (
        <Container>
          <h3>Bench Press</h3>
          <DayTimePicker
            theme={theme}
            timeSlotSizeMinutes={60}
            onConfirm={handleScheduled}
            isLoading={isScheduling}
            isDone={isScheduled}
            err={scheduleErr}
          />
          <button className="btn btn-primary" onClick={toWeights}>Cancel</button>
        </Container>
      )}

      {view === "Squat" && (
        <>
          <h3>Squat Rack</h3>
          <DatePicker onChange={(v) => {
              getAvailableReservations(v,1,2)
              setDate(v)
            }
          } 
          value={date}/>
          {renderAvailable(1,2)}
          <button className="btn btn-primary" onClick={toWeights}>Cancel</button>
        </>
      )}

      {view === "Pool Lane" && (
        <Container>
          <h3>Pool Lane</h3>
          <DayTimePicker
            theme={theme}
            timeSlotSizeMinutes={60}
            onConfirm={handleScheduled}
            isLoading={isScheduling}
            isDone={isScheduled}
            err={scheduleErr}
          />
          <button className="btn btn-primary" onClick={toPool}>Cancel</button>
        </Container>
      )}

      {view === "Track Lane" && (
        <Container>
          <h3>Track Lane</h3>
          <DayTimePicker
            theme={theme}
            timeSlotSizeMinutes={60}
            onConfirm={handleScheduled}
            isLoading={isScheduling}
            isDone={isScheduled}
            err={scheduleErr}
          />
          <button className="btn btn-primary" onClick={toTrack}>Cancel</button>
        </Container>
      )}
    </>
  );
}

export default Reservations;
