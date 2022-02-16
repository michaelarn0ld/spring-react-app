import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/accounts/Login";
import Registration from "./components/accounts/Registration";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

function App() {

const [userStatus, setUserStatus] = useState({
  user: null,
  login(username) {
    setUserStatus((prev) => ({ ...prev, user: username}));
  },
  logout(){
    localStorage.removeItem("token");
    setUserStatus((prev) => ({ ...prev, user: null }));
  },
});


  return (
    <Router>
      <NavBar userStatus={userStatus} />
      <Switch>
        <Route path="/login">
          {userStatus.user ? (
            <Redirect to="/" />
          ) : (
            <Login userStatus={userStatus} />
          )}
        </Route>
        <Route path="/register">
        {localStorage.getItem("token") ? <Redirect to="/" /> : <Registration />}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
