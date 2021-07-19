import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CardTravelIcon from "@material-ui/icons/CardTravel";
const MainListItems = () => {
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
  return (
    <div>
      <ListItem onClick={toDashboard} button>
        <ListItemIcon>
          <DashboardIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem onClick={toAccount} button>
        <ListItemIcon>
          <PermIdentityIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItem>
      <ListItem onClick={toTrips} button>
        <ListItemIcon>
          <CardTravelIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="My Trips" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon style={{ color: "rgb(42, 187, 172)" }} />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
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
