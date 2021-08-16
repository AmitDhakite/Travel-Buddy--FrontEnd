import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
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
import MainListItems, { secondaryListItems } from "../listItems.js";
import Menu from "../../layout/Menu";
import { useHistory } from "react-router-dom";
import MyTripCards from "./MyTripCards";
import classes1 from "../../../styles/TravelBuddy.module.css";
import Button from "@material-ui/core/Button";
import axios from "../../../axios.js";
import SelfTripCard from "./SelfTripCard";
import img from "../../../images/TravelBuddy.png";
import Filter from "./Filter.js";
import Slide from "@material-ui/core/Slide";
import Footer from "../../layout/Footer";

import LoadingTrips from "../../layout/LoadingTrips";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import cities from "./cities.js";

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
const filter1 = createFilterOptions();
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
  const token = localStorage.getItem("token");
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
  const [trips, setTrips] = useState([]);
  const [showError, setShowError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [allTrips, setAllTrips] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(async () => {
    try {
      setIsFetching(true);
      const res = await axios.post("/getAllTrips", {
        headers: { authorization: "Bearer " + token },
      });
      const results = res.data.filter(
        (r) => r.userId !== localStorage.getItem("userId")
      );
      console.log(res.data);
      // setTrips(res.data);
      // setAllTrips(res.data);
      setIsFetching(false);
      setTrips(results);
      setAllTrips(results);
    } catch (e) {
      setShowError(true);
      console.log(e);
    }
  }, []);
  const [filter, setFilter] = useState({
    from: "",
    to: "",
    typeOfJourney: [],
    prefferedTransport: [],
    date: "",
  });

  useEffect(() => {
    console.log(filter);
    var typeFilteredArray = [];
    if (filter.typeOfJourney.length > 0) {
      typeFilteredArray = allTrips.filter((t) => {
        var flag = false;
        filter.typeOfJourney.forEach((f) => {
          if (f === "") return false;
          if (f === "Two Way") {
            if (t.twoWay) {
              flag = true;
              return;
            }
          } else {
            if (!t.twoWay) {
              flag = true;
              return;
            }
          }
        });
        return flag;
      });
    } else typeFilteredArray = allTrips;
    var transportFiltered = [];
    if (filter.prefferedTransport.length > 0) {
      transportFiltered = typeFilteredArray.filter((t) => {
        if (t === "") return false;
        var flag = false;
        filter.prefferedTransport.forEach((f) => {
          if (f == t.transport) {
            flag = true;
            return;
          }
        });
        return flag;
      });
    } else transportFiltered = typeFilteredArray;

    var dateFiltered = [];
    if (filterByDate && filter.date !== "") {
      console.log(filter.date);
      dateFiltered = transportFiltered.filter((t) => {
        return (
          t.startDate.substring(8, 10) == filter.date.getDate() &&
          t.startDate.substring(5, 7) == filter.date.getMonth() &&
          t.startDate.substring(0, 4) == filter.date.getFullYear()
        );
      });
    } else dateFiltered = transportFiltered;

    var routeFiltered = [];
    if (filter.from !== "") {
      routeFiltered = dateFiltered.filter((t) => t.from === filter.from);
    } else routeFiltered = dateFiltered;

    var routeFiltered1 = [];
    if (filter.to !== "") {
      routeFiltered1 = routeFiltered.filter((t) => t.to === filter.to);
    } else routeFiltered1 = routeFiltered;

    setTrips(routeFiltered1);
  }, [filter]);

  const editHandler = async (e) => {
    try {
      // const res = await axios.post("/editTrip", { id: Trips[e]._id });
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

  // Date
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-08-15T21:11:54")
  );

  const handleDateChange = (date) => {};
  //filterDiv

  const typeChange = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setFilter((p) => {
        var newType = p.typeOfJourney;
        if (!newType.includes(name)) newType.push(name);
        let uniqueChars = [...new Set(newType)];
        return {
          ...p,
          typeOfJourney: uniqueChars,
        };
      });
    } else {
      if (filter.typeOfJourney.includes(name)) {
        const ind = filter.typeOfJourney.indexOf(name);
        if (ind >= 0) {
          setFilter((p) => {
            var newType = p.typeOfJourney;
            newType.splice(ind, 1);
            return {
              ...p,
              typeOfJourney: newType,
            };
          });
        }
      }
    }
    console.log(filter);
  };
  const transportChange = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setFilter((p) => {
        var newType = p.prefferedTransport;
        if (!newType.includes(name)) newType.push(name);
        let uniqueChars = [...new Set(newType)];
        return {
          ...p,
          prefferedTransport: uniqueChars,
        };
      });
    } else {
      if (filter.prefferedTransport.includes(name)) {
        const ind = filter.prefferedTransport.indexOf(name);
        if (ind >= 0) {
          setFilter((p) => {
            var newType = p.prefferedTransport;
            newType.splice(ind, 1);
            return {
              ...p,
              prefferedTransport: newType,
            };
          });
        }
      }
    }
    console.log(filter.prefferedTransport);
  };

  const [filterByDate, setFilterByDate] = useState(false);

  const months = [];
  const dateChange = (e) => {
    setSelectedDate(e);
    setFilter((p) => {
      return {
        ...p,
        date: e,
      };
    });
    console.log(filter.date);
  };

  const filterDate = (e) => {
    const { checked } = e.target;
    if (!checked) {
      setFilter((f) => {
        return {
          ...f,
          date: "",
        };
      });
    }
    setFilterByDate(checked);
  };

  const fromCityChangeHandler = (e) => {
    const value = e.title;
    setFilter((p) => {
      return {
        ...p,
        from: value,
      };
    });
  };
  const toCityChangeHandler = (e) => {
    const value = e.title;
    console.log(value);
    setFilter((p) => {
      return {
        ...p,
        to: value,
      };
    });
  };

  const resetRoute = () => {
    setFilter((p) => {
      return {
        ...p,
        from: "",
        to: "",
      };
    });
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
            Find your Travel Buddies
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
          <MainListItems page="1" />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        {showError && <Error />}
        <Paper className={classes1.tripDecor}>
          <Slide
            direction="up"
            in={true}
            timeout={600}
            mountOnEnter
            unmountOnExit
          >
            <img className={classes1.tripDecorCard} src={img} />
          </Slide>
          <div className={classes1.parentDiv}>
            <div className={classes1.filter}>
              <p className={classes1.filterYourSearch}>Filter your search</p>
              <div className={classes1.filterDiv}>
                <div style={{ display: "flex" }}>
                  <p className={classes1.filterRouteHead}>Route</p>
                  <p className={classes1.clear}>Clear</p>
                  <CancelIcon
                    onClick={resetRoute}
                    className={classes1.cancel}
                  />
                </div>
                <div className={classes1.routeDiv}>
                  <p className={classes1.routeP}>From:</p>
                  <div className={classes1.selectDiv}>
                    <Select
                      name="from"
                      options={cities}
                      isSearchable
                      onChange={fromCityChangeHandler}
                      value={{ label: filter.from, title: filter.from }}
                    />
                  </div>
                </div>
                <div className={classes1.routeDiv}>
                  <p className={classes1.routeP}>To:</p>
                  <div className={classes1.selectDiv1}>
                    <Select
                      name="to"
                      options={cities}
                      isSearchable
                      onChange={toCityChangeHandler}
                      value={{ label: filter.to, title: filter.to }}
                    />
                  </div>
                </div>
              </div>
              <div className={classes1.filterDiv}>
                <div className={classes1.checkbox1} onChange={typeChange}>
                  <p className={classes1.filterHead}>Type of Journey</p>
                  <div className={classes1.checkbox}>
                    <Filter label="One Way" name="One Way" />
                  </div>
                  <div className={classes1.checkbox}>
                    <Filter label="Two Way" name="Two Way" />
                  </div>
                </div>
                <div className={classes1.filterDiv} onChange={transportChange}>
                  <p className={classes1.filterHead}>Preffered Transport</p>
                  <div className={classes1.checkbox}>
                    <Filter label="Bus" name="Bus" />
                  </div>
                  <div className={classes1.checkbox}>
                    <Filter label="Cab" name="Cab" />
                  </div>
                  <div className={classes1.checkbox}>
                    <Filter label="Flight" name="Flight" />
                  </div>

                  <div className={classes1.checkbox}>
                    <Filter label="Own Vehicle" name="Own Vehicle" />
                  </div>

                  <div className={classes1.checkbox}>
                    <Filter label="Train" name="Train" />
                  </div>
                </div>
                <div className={classes1.filterDiv}>
                  <p className={classes1.filterHeadDate1}></p>
                  <div className={classes1.checkbox} onChange={filterDate}>
                    <Filter label="Preffered Date" />
                  </div>
                  <div style={{ width: "80%" }} className={classes1.checkbox}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <div>
                        <KeyboardDatePicker
                          onChange={dateChange}
                          disabled={!filterByDate}
                          margin="normal"
                          id="date-picker-dialog"
                          format="dd/MM/yyyy"
                          value={selectedDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </div>
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes1.selfTripDiv}>
              {isFetching ? (
                <div className={classes1.loadingTrips}>
                  <p className={classes1.tripHead}>
                    Loading trips to board on...
                  </p>
                  <div style={{ marginLeft: "50%" }}>
                    <LoadingTrips />
                    <LoadingTrips />
                    <LoadingTrips />
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  {trips.length === 0 ? (
                    <p
                      style={{ marginTop: "150px" }}
                      className={classes1.tripHead}
                    >
                      There are no Trips added yet according to your search:
                    </p>
                  ) : (
                    <p className={classes1.tripHead}>Trips you can board on:</p>
                  )}
                  {trips.map((t, i) => (
                    <div className={classes1.selfTripCard}>
                      <SelfTripCard
                        delete={() => {}}
                        edit={() => {
                          editHandler(i);
                        }}
                        id={t._id}
                        userId={t.userId}
                        noOfPeople={t.noOfPeople}
                        transport={t.transport}
                        from={t.from}
                        to={t.to}
                        twoWay={t.twoWay}
                        startDate={t.startDate}
                        endDate={t.endDate}
                        by={t}
                      />
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
        </Paper>
        <div style={{ marginTop: "-200px" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
