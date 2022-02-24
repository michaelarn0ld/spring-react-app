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
        <body>
            <div className={"container"}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                    <a className="navbar-brand" href="#">Welcome</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className={"navbar-nav mr-auto mt-2 mt-lg-0"}>
                            <li className="nav-item active">
                                <Link to="/" className={"nav-link active"}>
                                    Home
                                </Link>
                            </li>
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
                            <li className="nav-item">
                                <Link to="/admin" className={"nav-link"}>
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </body>
     );
}

export default NavBar;