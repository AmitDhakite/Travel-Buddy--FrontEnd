import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard.js";
import MyAccount from "./components/dashboard/MyAccount.js";
import Trips from "./components/dashboard/trips/Trips.js";
import TravelBuddy from "./components/dashboard/travelBuddy/TravelBuddy.js";
import Chat from "./components/dashboard/Chat/Chat.js";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/dashboard" exact>
            {localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== undefined &&
            localStorage.getItem("token") !== "" ? (
              <Dashboard />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/myAccount" exact>
            {localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== undefined &&
            localStorage.getItem("token") !== "" ? (
              <MyAccount />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/myTrips" exact>
            {localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== undefined &&
            localStorage.getItem("token") !== "" ? (
              <Trips />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/travelBuddy" exact>
            {localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== undefined &&
            localStorage.getItem("token") !== "" ? (
              <TravelBuddy />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/chat" exact>
            {localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== undefined &&
            localStorage.getItem("token") !== "" ? (
              <Chat />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/" exact>
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
