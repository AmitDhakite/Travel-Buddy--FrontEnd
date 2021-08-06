import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classes1 from "../../../styles/SelfTripCardTravelBuddy.module.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SpeedDial from "../../layout/SpeedDialTravelBuddy";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CommuteIcon from "@material-ui/icons/Commute";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonIcon from "@material-ui/icons/Person";
// import EditTrip from "./EditTrip";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 0",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleClick = (e) => {
    try {
    } catch (e) {
      console.log(e);
    }
  };
  const [editOpen, setEditOpen] = useState(false);
  const editHandler = () => {
    setEditOpen(true);
  };

  const showDate = (e) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (e === "") return;
    var d = e.substring(8, 10);
    d += "/";
    d += months[parseInt(e.substring(5, 7))];
    d += "/";
    d += e.substring(0, 4);
    return d;
  };

  return (
    <Card className={classes.root + " " + classes1.tripcard}>
      <CardContent>
        <div className={classes1.header}>
          <Typography className={classes.title} color="white" gutterBottom>
            {props.twoWay ? "Round Trip" : "One Way Trip"}
          </Typography>
          <Typography className={classes.title} color="white" gutterBottom>
            <PersonIcon style={{ marginBottom: "-5px" }} /> {props.by.name}
          </Typography>
        </div>
        <Typography variant="h6" component="h2" className={classes1.route}>
          <p className={classes1.from}>{props.from}</p>{" "}
          <p>
            {!props.twoWay ? (
              <ArrowRightAltIcon
                style={{ color: "rgb(42, 187, 172)", fontSize: "2rem" }}
              />
            ) : (
              <SyncAltIcon
                style={{ color: "rgb(42, 187, 172)", fontSize: "2rem" }}
              />
            )}
          </p>{" "}
          <p className={classes1.from}>{props.to}</p>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            <CommuteIcon
              style={{
                color: "rgba(42, 187, 172, 1)",
                marginBottom: "-10px",
                fontSize: "2rem",
                marginRight: "10px",
              }}
            />{" "}
            Preffering by {props.transport}
          </div>
        </Typography>
        <Typography
          style={{ marginLeft: "20px", marginTop: "10px" }}
          className={classes.pos}
          color="textSecondary"
        >
          <PeopleAltIcon
            style={{
              marginRight: "10px",
              color: "rgba(42, 187, 172, 1)",
              marginBottom: "-10px",
              fontSize: "2rem",
            }}
          />
          Number of people: {props.noOfPeople}
          <br />
        </Typography>
        <Typography
          style={{ marginLeft: "20px", marginTop: "20px", display: "flex" }}
          className={classes.pos}
          color="textSecondary"
        >
          <EventNoteIcon
            style={{
              marginRight: "10px",
              color: "rgba(42, 187, 172, 1)",
              fontSize: "2rem",
            }}
          />
          {showDate(props.startDate)}{" "}
          {props.twoWay && (
            <React.Fragment>- {showDate(props.endDate)}</React.Fragment>
          )}
          <br />
        </Typography>
      </CardContent>
      <CardActions
        style={{
          backgroundImage: "linear-gradient(rgba(42, 187, 172, 1), #00838f)",
        }}
      >
        <SpeedDial
          handleClick={handleClick}
          delete={props.delete}
          edit={editHandler}
        />
      </CardActions>
    </Card>
  );
}
