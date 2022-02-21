import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function NavBar() {
    const [userStatus, setUserStatus] = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            setUserStatus({ user: jwtDecode(token) });
        }
    }, [setUserStatus]);

    return ( 
        <nav>
        <Link to="/">
          Home
        </Link>
        <div>
          <ul className="navbar-nav">
            {userStatus?.user ? (
                <li className="nav-item">
                    <button onClick={() => {
                        setUserStatus(null);
                        localStorage.removeItem("token");
                    }}>
                        Logout {userStatus.user.sub}
                    </button>
                </li>
            ) : (
                <li className="nav-item">
                    <Link to="/login">Login</Link>
                </li>
            )}
            <li className="nav-item">
              <Link to="/register">
                {localStorage.getItem("token") ? "" : "Register"}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
     );
}

export default NavBar;