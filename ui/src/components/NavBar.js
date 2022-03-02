import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function NavBar() {
  const [userStatus, setUserStatus] = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserStatus({ user: jwtDecode(token) });
    }
  }, [setUserStatus]);

  return (
    <div className={"container"}>
      <nav className="navbar navbar-expand-sm navbar-light white">
        {location.pathname === "/" && (
          <a className="navbar-brand" href="#">
            Welcome
          </a>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className={"navbar-nav mr-auto mt-2 mt-lg-0"}>
            <li className="nav-item">
              <Link to="/" className={"nav-link active"}>
                Home
              </Link>
            </li>
            {userStatus?.user?.authorities?.split(",").includes("ADMIN") && (
              <li className="nav-item">
                <Link to="/admin" className={"nav-link"}>
                  Admin
                </Link>
              </li>
            )}
            {userStatus?.user?.authorities?.split(",").includes("USER") && (
              <li className="nav-item">
                  <Link to="/myreservations" className="nav-link">
                    My Reservations
                  </Link>
              </li>
            )}
            {userStatus?.user ? (
              <li className="nav-item">
                <Link
                  class="nav-link navbar sticky-top navbar-light bg-light"
                  onClick={() => {
                    setUserStatus(null);
                    localStorage.removeItem("token");
                  }}
                >
                  Logout {userStatus.user.sub}
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className={"nav-link"}>
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/register" className={"nav-link"}>
                {localStorage.getItem("token") ? "" : "Register"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
