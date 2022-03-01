import React, { useState } from "react";
import { render } from "react-dom";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import styled from "styled-components";

function Reservations() {

    const [ view, setView ] = useState("Main");
    const [ isScheduling, setIsScheduling ] = useState(false);
    const [ isScheduled, setIsScheduled ] = useState(false);
    const [ scheduleErr, setScheduleErr ] = useState("");




    const handleScheduled = dateTime => {
        console.log("scheduled: ", dateTime);

    };

        fetch(`http://localhost:8081/1/1?=${Date}`, {
            method: "GET",
            headers: {
                
            }
        })



    const theme = {
        primary: "#141bde",
        secondary: "#a6aba6",
        background: "#fff", // This should match the container background
        buttons: {
          disabled: {
            color: "#333",
            background: "#d91111"
          },
          confirm: {
            color: "#fff",
            background: "#929692",
            hover: {
              color: "",
              background: "#36b33e"
            }
          }
        },
        feedback: {
          success: {
            color: "#29aba4"
          },
          failed: {
            color: "#eb7260"
          }
        }
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

const cancelMain = () => {
    return setView("Main");
}

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
        {view === "Main" && (
            <>
            <h3>Select a Facility</h3>
            <button onClick={toWeights}>Weight Room</button>
            <button onClick={toPool}>Pool</button>
            <button onClick={toTrack}>Track</button>
            </>
        )};

        {view === "Weights" && (
            <>
            <h3>What Would You Like to Reserve?</h3>
            <button onClick={toBenchPress}>Bench Press</button>
            <button onClick={toSquatRack}>Squat Rack</button>
            <button onClick={cancelMain}>Cancel</button>
            </>
            )};

            {view === "Pool" && (
            <>
            <h3>What Would You Like to Reserve?</h3>
            <button onClick={toPoolLane}>Pool Lane</button>
            <button onClick={cancelMain}>Cancel</button>
            </>
            )};

            {view === "Track" && (
            <>
            <h3>What Would You Like to Reserve?</h3>
            <button onClick={toTrackLane}>Track Lane</button>
            <button onClick={cancelMain}>Cancel</button>
            </>
            )};


        {view === "Bench" && (
        <Container>
            <h3>Bench Press</h3>
       <DayTimePicker theme={theme} timeSlotSizeMinutes={60} onConfirm={handleScheduled} isLoading={isScheduling} isDone={isScheduled} err={scheduleErr} />
       <button onClick={toWeights}>Cancel</button>
       </Container>
        )};

        {view === "Squat" && (
        <Container>
            <h3>Squat Rack</h3>
       <DayTimePicker theme={theme} timeSlotSizeMinutes={60} onConfirm={handleScheduled} isLoading={isScheduling} isDone={isScheduled} err={scheduleErr} />
       <button onClick={toWeights}>Cancel</button>
       </Container>
        )};

        {view === "Pool Lane" && (
        <Container>
            <h3>Pool Lane</h3>
       <DayTimePicker theme={theme} timeSlotSizeMinutes={60} onConfirm={handleScheduled} isLoading={isScheduling} isDone={isScheduled} err={scheduleErr} />
       <button onClick={toPool}>Cancel</button>
       </Container>
        )};

        {view === "Track Lane" && (
        <Container>
            <h3>Track Lane</h3>
       <DayTimePicker theme={theme} timeSlotSizeMinutes={60} onConfirm={handleScheduled} isLoading={isScheduling} isDone={isScheduled} err={scheduleErr} />
       <button onClick={toTrack}>Cancel</button>
       </Container>
        )};
        </>
     );
}

export default Reservations;
