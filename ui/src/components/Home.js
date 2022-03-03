import React, { useState, useEffect } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Home() {
  const history = useHistory();
  const [userStatus, setUserStatus] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserStatus({ user: jwtDecode(token) });
    }
  }, [setUserStatus]);

  return (
    <>
      <div className={"card-group"}>
        <div className={"card bg-dark text-white"}>
          <img
            src={"http://www.vanguardlions.com/images/2018-19/5.jpg"}
            className={"card-img opacity-50 cards"}
            alt={"track"}
          />
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body">
                <h5 className={"card-title"}>Track</h5>
                <p className={"card-text"}>
                  Whether you are training for a marathon or sprints, our
                  spacious track contains lanes that can fit up to 10 people at
                  once.
                </p>
                {userStatus?.user ? (
                <button
                  onClick={() => history.push("/Track/reserve")}
                  type="button"
                  className="btn btn-primary"
                >
                  Reserve Now
                </button> ) :  (<button
                  onClick={() => history.push("/login")}
                  type="button"
                  className="btn btn-primary"
                >
                  Reserve Now
                </button> )}
              </div>
            </div>
          </div>
        </div>
        <div className={"card bg-dark text-white"}>
          <img
            src={
              "https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2VpZ2h0JTIwcm9vbXxlbnwwfHwwfHw%3D&w=1000&q=80"
            }
            className={"card-img opacity-50 cards"}
            alt={"yoga girl"}
          />
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body">
                <h5 className={"card-title"}>Weight Room</h5>
                <p className={"card-text"}>
                  Our weightrooms are one of the best in the country, with over
                  5,000 sq ft and a large variety of equipment, whether you're
                  doing box jumps or band-resisted exercises.
                </p>
                {userStatus?.user ? (
                <button
                  onClick={() => history.push("/Weights/reserve")}
                  type="button"
                  className="btn btn-primary"
                >
                  Reserve Now
                </button> ) :  (<button
                  onClick={() => history.push("/login")}
                  type="button"
                  className="btn btn-primary"
                >
                  Reserve Now
                </button> )}
              </div>
            </div>
          </div>
        </div>
        <div className={"card bg-dark text-white"}>
          <img
            src={
              "https://www.familyfuntwincities.com/wp-content/uploads/2020/07/grove-aquatic-center.jpg"
            }
            className={"card-img opacity-50 cards"}
            alt={"yoga girl"}
          />
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body">
                <h5 className={"card-title"}>Pool</h5>
                <p className={"card-text"}>
                  Enjoy Swimming in world-class indoor pool featuring a water
                  park and swimming lanes.
                </p>
                {userStatus?.user ? (
                <button
                  onClick={() => history.push("/Pool/reserve")}
                  type="button"
                  className="btn btn-primary"
                >
                  Reserve Now
                </button> ) :  (<button
                  onClick={() => history.push("/login")}
                  type="button"
                  className="btn btn-primary"
                >
                  Reserve Now
                </button> )}
              </div>
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
          <div className={"card-img-overlay"}>
            <div className="card-title">
              <div className="card-body text-center">
                <h5 className={"card-title text-center"}>Register Today!</h5>
                <p className={"card-text text-center"}>
                  Register and view our membership options that suit your needs.
                  The over 20,000 sq ft fitness dream is awaiting you!
                </p>
                <button
                  onClick={() => history.push("/register")}
                  type="button"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
