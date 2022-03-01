import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/accounts/Login";
import Registration from "./components/accounts/Registration";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import AuthContext from "./context/AuthContext";
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";

function App() {

  const [userStatus, setUserStatus] = useState();

  //still need to protect routes for users that are logged in 
  // as well as consumer vs admin

  return (
    <Router>
      <Header />
      <AuthContext.Provider value={[userStatus, setUserStatus]}>
        <NavBar />
        <Switch>
          <Route path="/login">
            {userStatus?.user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {localStorage.getItem("token") ? <Redirect to="/" /> : <Registration />}
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>

  );
}

export default App;
