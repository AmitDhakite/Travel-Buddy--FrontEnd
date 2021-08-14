import React, { useState } from "react";
import clsx from "clsx";
import { alpha, makeStyles } from "@material-ui/core/styles";
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
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainListItems, { secondaryListItems } from "./listItems";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import InputBase from "@material-ui/core/InputBase";
import cyan from "@material-ui/core/colors/cyan";

import Slide from "@material-ui/core/Slide";
import classes1 from "../../styles/Dashboard.module.css";
import dotenv from "dotenv";
import Card from "./Card";
import AccordianResults from "./AccordianResults";
import Loading from "../layout/Loading";
import ImageList from "../layout/ImageList";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import Menu from "../layout/Menu";
import { useHistory } from "react-router-dom";
import Footer from "../layout/Footer";
import Carausel from "../layout/Carausel";

dotenv.config();
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
  root1: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginLeft: "0",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "28ch",
      "&:focus": {
        width: "35ch",
      },
    },
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
  const history = useHistory();
  if (localStorage.getItem("token") === null) history.replace("/");
  const user = useSelector((state) => state.auth);
  console.log(user);
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const searchChangeHandler = (e) => {
    const { value } = e.target;
    if (value === "") {
      setResults([]);
      setTempSearch("");
    }
    setSearch(value);
  };
  const searchSubmitHandler = async (e) => {
    setTempSearch(search);
    setSearching(true);
    setResults([]);
    const query =
      "https://google-search3.p.rapidapi.com/api/v1/search/q=top+tourism+attractions+near+" +
      search +
      "&num=25";
    var options = {
      method: "GET",
      url: query,
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
      },
    };

    console.log("searching");
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.results);
        setResults(response.data.results);
        setSearching(false);
      })
      .catch(function (error) {
        console.error(error);
      });
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
            Travel Buddy
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
          <MainListItems page="0" />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth="lg"
          className={classes.container}
          style={{ textAlign: "center" }}
        >
          <Slide
            direction="right"
            in={true}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <div className={classes1.newSearch}>
              <div className={classes.root} style={{ textAlign: "center" }}>
                <AppBar
                  position="static"
                  style={{
                    backgroundColor: cyan[800],
                    textAlign: "center",
                  }}
                >
                  <Toolbar>
                    <Typography
                      style={{ textAlign: "left" }}
                      className={classes.title}
                      variant="h6"
                      noWrap
                    >
                      Search for tourism places anywhere...
                    </Typography>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        onChange={searchChangeHandler}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) searchSubmitHandler();
                        }}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </div>
                  </Toolbar>
                </AppBar>
              </div>
            </div>
          </Slide>
          {tempSearch !== "" && (
            <div className={classes1.results}>
              <Paper style={{ padding: "20px 30px 50px" }}>
                <React.Fragment>
                  {searching && (
                    <React.Fragment>
                      <h2 style={{ textAlign: "left" }}>
                        Hold on! Finding the best matches for your search...
                      </h2>
                      <Loading />
                    </React.Fragment>
                  )}
                  {!searching && results.length !== 0 && (
                    <React.Fragment>
                      <h1 className={classes1.topDestinations}>
                        Top destinations near {tempSearch}:{" "}
                      </h1>
                      {results.map((r) => (
                        <div className={classes1.oneResultCard}>
                          <Card
                            title={r.title}
                            description={r.description}
                            link={r.link}
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              </Paper>
            </div>
          )}
          <div className={classes1.imageList}>
            {/* <Slide direction="up" in={true} mountOnEnter unmountOnExit> */}
            <Carausel
              style={{ textAlign: "center", backgroundColor: "white" }}
            />
            {/* <ImageList /> */}
            {/* </Slide> */}
          </div>
        </Container>
        <div style={{ marginTop: "-200px" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
