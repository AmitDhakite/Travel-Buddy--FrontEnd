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
              <Dashboard />
          </Route>
          <Route path="/myAccount" exact>
              <MyAccount />
            </Route>
          <Route path="/myTrips" exact>
              <Trips />
            </Route>
          <Route path="/travelBuddy" exact>
              <TravelBuddy />
           </Route>
          <Route path="/chat" exact>
              <Chat />
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
