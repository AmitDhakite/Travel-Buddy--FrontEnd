import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classes1 from "../../styles/Card.module.css";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 30,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const toTravelSite = () => {
    console.log("doing something");
    const win = window.open(props.link, "_blank");
    win.focus();
  };

  return (
    <Card
      className={classes.root + " " + classes1.card}
      style={{ marginTop: "25px" }}
    >
      <CardContent style={{ textAlign: "left" }}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.link?.substring(0, 70)}...
        </Typography>
        <Typography
          onClick={toTravelSite}
          className={classes1.title}
          variant="h5"
          component="h2"
        >
          {props.title}
        </Typography> 
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={toTravelSite} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
