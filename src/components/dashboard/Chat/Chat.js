import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect, useRef } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { format } from "timeago.js";
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
import SendIcon from "@material-ui/icons/Send";
import Send from "@material-ui/icons/Send";
import Friends from "./Friends";
import CircularProgress from "@material-ui/core/CircularProgress";
import { current } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

// import Message from "../../../../../server-side/models/message.model.js";

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
  const userId = localStorage.getItem("userId");
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChattingFriend, setCurrentChattingFriend] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current?.on("getMessage", (msg) => {
      console.log(msg);
      setArrivalMessage({
        sender: msg.senderId,
        text: msg.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender))
      setMessages((p) => [...p, arrivalMessage]);
    console.log(arrivalMessage);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", userId);
    socket.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userId]);

  useEffect(async () => {
    try {
      const res = await axios.get(
        "/getConversations/" + localStorage.getItem("userId")
      );
      setConversations(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const chatChange = (c) => {
    setCurrentChat(c);
  };

  useEffect(async () => {
    setLoading(true);
    if (currentChat) {
      var friendId = currentChat?.members[1];
      if (friendId == userId) friendId = currentChat?.members[0];
      try {
        const user = await axios.get("/getUser/" + friendId);
        setCurrentChattingFriend(
          user.data.firstName + " " + user.data.lastName
        );
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const msges = await axios.get("/getChats/" + currentChat?._id);
      setMessages(msges.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentChat]);

  const sendMessage = async () => {
    if (newMessage !== "") {
      setMessages([
        ...messages,
        { conversationId: currentChat._id, sender: userId, text: newMessage },
      ]);
      const recieverId = currentChat.members.find(
        (member) => member !== userId
      );
      socket.current.emit("sendMessage", {
        senderId: userId,
        recieverId,
        text: newMessage,
      });

      try {
        console.log(currentChat._id);
        const res = await axios.post("/addNewMessage", {
          conversationId: currentChat._id,
          sender: userId,
          text: newMessage,
        });
        setNewMessage("");
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const enterHandler = (e) => {
    if (e.code == "Enter") {
      sendMessage();
    }
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
                      <h4>Connected Buddies</h4>
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
                      {conversations.map((c) => (
                        <div
                          onClick={() => {
                            chatChange(c);
                          }}
                        >
                          <Friends members={c.members} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {loading && (
                  <div className={classes2.mesgs1}>
                    <div className={classes2.openConversation}>
                      <div style={{ color: "white" }}>
                        .......................
                      </div>
                      <CircularProgress
                        style={{ marginLeft: "25%", marginTop: "30%" }}
                      />
                    </div>
                  </div>
                )}
                {currentChat && !loading && (
                  <React.Fragment>
                    <div className={classes2.mesgs}>
                      <div className={classes2.msgHeader}>
                        {currentChattingFriend}
                      </div>
                      <div className={classes2.msg_history}>
                        {messages.length === 0 && (
                          <h1 style={{ color: "grey", textAlign: "center" }}>
                            Start a conversation
                          </h1>
                        )}
                        {messages.map((m) => {
                          if (m.sender == userId)
                            return (
                              <div className={classes2.outgoing_msg}>
                                <div className={classes2.sent_msg}>
                                  <p>{m.text}</p>
                                  <span className={classes2.time_date}>
                                    {" "}
                                    {format(m.createdAt)}
                                  </span>{" "}
                                </div>
                              </div>
                            );
                          else
                            return (
                              <div ref={scrollRef}>
                                <div className={classes2.incoming_msg}>
                                  <div className={classes2.incoming_msg_img}>
                                    {" "}
                                    <img
                                      src="https://ptetutorials.com/images/user-profile.png"
                                      alt="sunil"
                                    />{" "}
                                  </div>
                                  <div className={classes2.received_msg}>
                                    <div
                                      className={classes2.received_withd_msg}
                                    >
                                      <p>{m.text}</p>
                                      <span className={classes2.time_date}>
                                        {" "}
                                        {format(m.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                        })}
                        <div ref={scrollRef}>d</div>
                      </div>
                      <div className={classes2.type_msg}>
                        <div className={classes2.input_msg_write}>
                          <input
                            onKeyDown={enterHandler}
                            value={newMessage}
                            onChange={(e) => {
                              setNewMessage(e.target.value);
                            }}
                            type="text"
                            className={classes2.write_msg}
                            placeholder="Type a message"
                          />
                          <button
                            onClick={sendMessage}
                            className={classes2.msg_send_btn}
                            type="button"
                          >
                            <SendIcon className={classes2.sendIcon} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {!currentChat && !loading && (
                  <div className={classes2.mesgs1}>
                    <div className={classes2.openConversation}>
                      <div style={{ color: "white" }}>
                        .......................
                      </div>
                      <p className={classes2.line}>
                        Click on any buddy to start a conversation or connect to
                        new buddies...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Paper>
      </main>
    </div>
  );
}
