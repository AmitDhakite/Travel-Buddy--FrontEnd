import React, { useState, useEffect } from "react";
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
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import MainListItems, { secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "../layout/Table";
import Menu from "../layout/Menu";
import { useSelector, useDispatch } from "react-redux";
import classes1 from "../../styles/MyAccount.module.css";
import axios from "../../axios.js";
import { authActions } from "../../store/index";
import Backdrop from "../layout/Backdrop";
import Footer from "../layout/Footer";

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

export default function MyAccount() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  if (localStorage.getItem("token") === null) history.replace("/");
  const [editForm, saveEditForm] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    password: "",
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [refresh, setRefresh] = useState(0);
  const data = useSelector((state) => state.auth);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/getUser/" + userId);
      setUser(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };

  const submitHandler = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/editUser", {
        user: user,
        userId: userId,
      });
      saveEditForm(false);
      dispatch(authActions.updateUser(res.data));
      setLoading(false);
      console.log("complet");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {loading && <Backdrop />}
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
            <AllInclusiveIcon />
          </IconButton>
          <Menu name={user.firstName} />
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
          <MainListItems page="4" />
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
                <Table user={user} />
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
              <Grid container spacing={3} onChange={inputChangeHandler}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    autoComplete="no"
                    label="First name"
                    value={user.firstName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    autoComplete="no"
                    id="lastName"
                    value={user.lastName}
                    name="lastName"
                    label="Last name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    disabled
                    autoComplete="no"
                    id="email"
                    value={user.email}
                    name="email"
                    label="Email Address"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoComplete="no"
                    value={user.mobile}
                    id="phone"
                    name="mobile"
                    label="Mobile No."
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    value={user.addressLine1}
                    autoComplete="no"
                    name="addressLine1"
                    label="Address line 1"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="addressLine2"
                    value={user.addressLine2}
                    label="Address line 2"
                    autoComplete="no"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    value={user.city}
                    label="City"
                    autoComplete="no"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    autoComplete="no"
                    value={user.state}
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    value={user.zipCode}
                    name="zipCode"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="no"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    value={user.country}
                    fullWidth
                    autoComplete="no"
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "rgb(42, 187, 172)",
                    marginTop: "50px",
                  }}
                  className={classes.submit}
                  onClick={submitHandler}
                >
                  Save Changes
                </Button>
              </Grid>
            </React.Fragment>
          </Paper>
        )}
        <div style={{ marginTop: "-200px" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
