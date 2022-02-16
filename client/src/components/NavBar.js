import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function NavBar() {
    const [userStatus, setUserStatus] = useContext(AuthContext);

    return ( 
        <nav>
        <Link to="/">
          Home
        </Link>
        <div>
          <ul className="navbar-nav">
            {userStatus.user ? (
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
              <Link to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
     );
}

export default NavBar;