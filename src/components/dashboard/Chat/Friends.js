import React, { useState, useEffect } from "react";
import classes2 from "../../../styles/Chat2.module.css";
import Avatar from "@material-ui/core/Avatar";
import teal from "@material-ui/core/colors/teal";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../../axios.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  blue: {
    color: theme.palette.getContrastText(teal[400]),
    backgroundColor: teal[400],
  },
  purple: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
}));

const Friends = ({ members, isOnline, current }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  useEffect(async () => {
    try {
      const myId = localStorage.getItem("userId");
      var userId = members[0];
      if (userId == myId) userId = members[1];
      const res = await axios.get("/getUser/" + userId);
      setName(res.data.firstName + " " + res.data.lastName);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={current === name ? classes2.hh1 : classes2.hh}>
      <div className={classes2.chat_people}>
        <div className={classes2.chat_img}>
          <Avatar className={classes.blue}>{name.substring(0, 1)}</Avatar>
        </div>
        <div className={classes2.chat_ib}>
          <h5>
            {name}
            <span className={classes2.chat_date}>{isOnline && "Online"}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Friends;
