import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainListItems, { secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "../layout/Table";
import Menu from "../layout/Menu";

import classes1 from "../../styles/MyAccount.module.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const [editForm, saveEditForm] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "rgb(42, 187, 172)" }}
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="white"
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>{" "}
          <Typography
            component="h1"
            variant="h6"
            color="rgb(42, 187, 172)"
            noWrap
            className={classes.title}
          >
            My Account
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {!editForm ? (
          <Paper className={classes1.profileDetails}>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Grid style={{ marginTop: "30px" }} container spacing={3}>
                <Table />
                <Button
                  onClick={() => {
                    saveEditForm(true);
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "rgb(42, 187, 172)",
                    marginTop: "50px",
                  }}
                  className={classes.submit}
                >
                  Update Account Details
                </Button>
              </Grid>
            </React.Fragment>
          </Paper>
        ) : (
          <Paper className={classes1.profileForm}>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Edit Account Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="phone"
                    name="mobile"
                    label="Mobile No."
                    fullWidth
                    autoComplete="mobile no"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                  />
                </Grid>
                <Button
                  onClick={() => {
                    saveEditForm(false);
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "rgb(42, 187, 172)",
                    marginTop: "50px",
                  }}
                  className={classes.submit}
                >
                  Save Changes
                </Button>
              </Grid>
            </React.Fragment>
          </Paper>
        )}
      </main>
    </div>
  );
}

// <Grid container spacing={3}>
//   <Grid item xs={12} sm={6}>
//     <TextField
//       required
//       id="firstName"
//       name="firstName"
//       label="First name"
//       fullWidth
//       autoComplete="given-name"
//       />
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <TextField
//       required
//       id="lastName"
//       name="lastName"
//       label="Last name"
//       fullWidth
//       autoComplete="family-name"
//       />
//   </Grid>
//   <Grid item xs={12}>
//     <TextField
//       required
//       id="address1"
//       name="address1"
//       label="Address line 1"
//       fullWidth
//       autoComplete="shipping address-line1"
//       />
//   </Grid>
//   <Grid item xs={12}>
//     <TextField
//       id="address2"
//       name="address2"
//       label="Address line 2"
//       fullWidth
//       autoComplete="shipping address-line2"
//       />
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <TextField
//       required
//       id="city"
//       name="city"
//       label="City"
//       fullWidth
//       autoComplete="shipping address-level2"
//       />
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <TextField
//       id="state"
//       name="state"
//       label="State/Province/Region"
//       fullWidth
//       />
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <TextField
//       required
//       id="zip"
//       name="zip"
//       label="Zip / Postal code"
//       fullWidth
//       autoComplete="shipping postal-code"
//       />
//   </Grid>
//   <Grid item xs={12} sm={6}>
//     <TextField
//       required
//       id="country"
//       name="country"
//       label="Country"
//       fullWidth
//       autoComplete="shipping country"
//       />
//   </Grid>
