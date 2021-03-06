import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Error from "../../layout/Error";
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
import MainListItems, { secondaryListItems } from "../listItems";
import Menu from "../../layout/Menu";
import { useHistory } from "react-router-dom";
import MyTripCards from "./MyTripCards";
import classes1 from "../../../styles/Trips.module.css";
import Button from "@material-ui/core/Button";
import AddTrip from "./AddTrip";
import axios from "../../../axios.js";
import SelfTripCard from "./SelfTripCard";
import Footer from "../../layout/Footer";

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

export default function Trips() {
  const history = useHistory();
  if (localStorage.getItem("token") === null) history.replace("/");
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const token = localStorage.getItem("token");
  const [myTrips, setMyTrips] = useState([]);
  const [showError, setShowError] = useState(false);
  const [connections, setConnections] = useState([]);
  const [counter, setCounter] = useState(0);
  const userId = localStorage.getItem("userId");
  useEffect(async () => {
    try {
      const res = await axios.post(
        "/getAllTripsById",
        {
          id: userId,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setMyTrips(res.data);
    } catch (e) {
      setShowError(true);
      console.log(e);
    }
    try {
      const res = await axios.get("/getConnections/" + userId, {
        headers: { authorization: "Bearer " + token },
      });
      console.log(res.data);
      setConnections(res.data);
    } catch (e) {
      setShowError(true);
      console.log(e);
    }
  }, []);

  const deleteHandler = async (e) => {
    try {
      const res = await axios.post(
        "/deleteTrip",
        { id: myTrips[e]._id },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(res.data);
      setMyTrips((p) => {
        const newOb = [];
        p.forEach((k, i) => {
          if (i !== e) newOb.push(k);
        });
        return newOb;
      });
    } catch (er) {
      setShowError(true);
      console.log(e);
    }
  };

  const editHandler = async (e) => {
    try {
      // const res = await axios.post("/editTrip", { id: myTrips[e]._id });
      console.log("to Edit:" + e);
      // setMyTrips((p) => {
      //   const newOb = [];
      //   p.forEach((k, i) => {
      //     if (i !== e) newOb.push(k);
      //   });
      //   return newOb;
      // });
    } catch (er) {
      console.log(er);
    }
  };

  const addNewTrip = (e) => {
    setMyTrips((p) => [e, ...p]);
  };

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
            My Trips
          </Typography>
          <IconButton color="inherit">
            <AllInclusiveIcon />
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
          <MainListItems page="2" />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        {showError && <Error />}
        <Paper className={classes1.tripDecor}>
          <MyTripCards className={classes1.tripDecorCard} />
          <div>
            <AddTrip addNewTrip={addNewTrip} />
          </div>
          <div className={classes1.selfTripDiv}>
            {myTrips.length === 0 ? (
              <p>You haven't added any Trips yet...</p>
            ) : (
              <p
                style={{
                  fontSize: "2rem",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Your added Trips:
              </p>
            )}
            {myTrips.map((t, i) => (
              <div className={classes1.selfTripCard}>
                <SelfTripCard
                  className={classes1.tripcard}
                  delete={() => {
                    deleteHandler(i);
                  }}
                  edit={() => {
                    editHandler(i);
                  }}
                  noOfPeople={t.noOfPeople}
                  transport={t.transport}
                  from={t.from}
                  to={t.to}
                  twoWay={t.twoWay}
                  startDate={t.startDate}
                  endDate={t.endDate}
                />
              </div>
            ))}
          </div>
        </Paper>
        <div style={{ marginTop: "-200px" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
