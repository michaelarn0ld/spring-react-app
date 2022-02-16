import { Link } from "react-router-dom";

function NavBar({userStatus}) {
    return ( 
        <nav>
        <Link to="/">
          Home
        </Link>
        <div>
          <ul className="navbar-nav">
            {userStatus.user ? (
                <li className="nav-item">
                    <button onClick={userStatus.logout}>
                        Logout {userStatus.user}
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