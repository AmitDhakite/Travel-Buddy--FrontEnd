import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import ChatIcon from "@material-ui/icons/Chat";

const MainListItems = ({ page }) => {
  const color = [];
  for (var i = 0; i < 5; i++) {
    if (i != page) {
      color.push("white");
    } else color.push("rgba(0,0,0,0.1)");
  }
  const history = useHistory();
  const toDashboard = () => {
    history.push("/dashboard");
  };
  const toAccount = () => {
    history.push("/myAccount");
  };
  const toTrips = () => {
    history.push("/myTrips");
  };
  const toTravelBuddy = () => {
    history.push("/travelBuddy");
  };
  const toChat = () => {
    history.push("/chat");
  };
  return (
    <div>
      <ListItem
        onClick={toDashboard}
        button
        style={{ backgroundColor: color[0] }}
      >
        <ListItemIcon>
          <DashboardIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        onClick={toTravelBuddy}
        style={{ backgroundColor: color[1] }}
      >
        <ListItemIcon>
          <PeopleOutlineIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="Travel Buddies" />
      </ListItem>
      <ListItem onClick={toTrips} button style={{ backgroundColor: color[2] }}>
        <ListItemIcon>
          <CardTravelIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="My Trips" />
      </ListItem>
      <ListItem button style={{ backgroundColor: color[3] }} onClick={toChat}>
        <ListItemIcon>
          <ChatIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItem>
      <ListItem
        style={{ backgroundColor: color[4] }}
        onClick={toAccount}
        button
      >
        <ListItemIcon>
          <PermIdentityIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItem>
    </div>
  );
};

export default MainListItems;

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: "rgb(42, 187, 172)" }} />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: "rgb(42, 187, 172)" }} />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{ color: "rgb(42, 187, 172)" }} />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
