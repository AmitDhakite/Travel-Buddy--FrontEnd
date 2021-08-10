import TextField from "@material-ui/core/TextField";
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
import MainListItems, { secondaryListItems } from "../listItems.js";
import Menu from "../../layout/Menu";
import { useHistory } from "react-router-dom";
import classes1 from "../../../styles/Chat.module.css";
import classes2 from "../../../styles/Chat2.module.css";
import Button from "@material-ui/core/Button";
import axios from "../../../axios.js";
import cities from "../trips/cities.js";

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
    height: 200,
  },
  title1: {
    fontSize: 18,
  },
}));

export default function Trips() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(async () => {
    try {
      const res = await axios.get(
        "/getConversations/" + localStorage.getItem("userId")
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            Chats
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
          <MainListItems page="3" />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <Paper className={classes1.chat}>
          <div className={classes2.container}>
            <div className={classes2.messaging}>
              <div className={classes2.inbox_msg}>
                <div className={classes2.inbox_people}>
                  <div className={classes2.headind_srch}>
                    <div className={classes2.recent_heading}>
                      <h4>Buddies</h4>
                    </div>
                    <div className={classes2.srch_bar}>
                      <div className={classes2.stylish_input_group}>
                        <span className={classes2.input_group_addon}>
                          <button type="button">
                            <i
                              className={classes2.fa + " " + classes2.fa_search}
                              aria-hidden="true"
                            ></i>{" "}
                          </button>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                  <div className={classes2.inbox_chat}>
                    <div
                      className={
                        classes2.chat_list + " " + classes2.active_chat
                      }
                    >
                      <div className={classes2.chat_people}>
                        <div className={classes2.chat_img}>
                          {" "}
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="sunil"
                          />{" "}
                        </div>
                        <div className={classes2.chat_ib}>
                          <h5>
                            Shawn Parker{" "}
                            <span className={classes2.chat_date}>Dec 25</span>
                          </h5>
                          <p>
                            Test, which is a new approach to have all solutions
                            astrology under one roof.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes2.mesgs}>
                  <div className={classes2.msgHeader}>Shawn Parker</div>
                  <div className={classes2.msg_history}>
                    <div className={classes2.incoming_msg}>
                      <div className={classes2.incoming_msg_img}>
                        {" "}
                        <img
                          src="https://ptetutorials.com/images/user-profile.png"
                          alt="sunil"
                        />{" "}
                      </div>
                      <div className={classes2.received_msg}>
                        <div className={classes2.received_withd_msg}>
                          <p>
                            Test which is a new approach to have all solutions
                          </p>
                          <span className={classes2.time_date}>
                            {" "}
                            11:01 AM | June 9
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={classes2.incoming_msg}>
                      <div className={classes2.incoming_msg_img}>
                        {" "}
                        <img
                          src="https://ptetutorials.com/images/user-profile.png"
                          alt="sunil"
                        />{" "}
                      </div>
                      <div className={classes2.received_msg}>
                        <div className={classes2.received_withd_msg}>
                          <p>
                            We work directly with our designers and suppliers,
                            and sell direct to you, which means quality,
                            exclusive products, at a price anyone can afford.
                          </p>
                          <span className={classes2.time_date}>
                            {" "}
                            11:01 AM | Today
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={classes2.outgoing_msg}>
                      <div className={classes2.sent_msg}>
                        <p>Apollo University, Delhi, India Test</p>
                        <span className={classes2.time_date}>
                          {" "}
                          11:01 AM | Today
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                  <div className={classes2.type_msg}>
                    <div className={classes2.input_msg_write}>
                      <input
                        type="text"
                        className={classes2.write_msg}
                        placeholder="Type a message"
                      />
                      <button className={classes2.msg_send_btn} type="button">
                        <i
                          className={
                            classes2.fa + " " + classes2.fa_paper_plane_o
                          }
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </main>
    </div>
  );
}
{
  /* <Paper className={classes1.chat}>
          <Paper className={classes1.people}>
            <div className={classes1.headerPeople}>
              <Typography className={classes.title1} color="white" gutterBottom>
                Talk to your Travel Buddies
              </Typography>
            </div>
            <div className={classes1.peopleBody}>
              {cities.map((c) => (
                <div>{c.label}</div>
              ))}
            </div>
          </Paper>
          <Paper className={classes1.chatting}>
            <div className={classes1.headerPeople}>
              <Typography className={classes.title1} color="white" gutterBottom>
                John Doe
              </Typography>
            </div>
          </Paper>
        </Paper> */
}
