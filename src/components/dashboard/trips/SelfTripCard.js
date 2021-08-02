import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classes1 from "../../../styles/SelfTripCard.module.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes1.header}>
          <Typography className={classes.title} color="white" gutterBottom>
            Word of the Day
          </Typography>
        </div>
        <Typography variant="h5" component="h2" className={classes1.route}>
          <p className={classes1.from}>{props.from}</p>{" "}
          <p>
            {!props.twoWay ? (
              <ArrowRightAltIcon
                style={{ color: "rgb(42, 187, 172)", fontSize: "3rem" }}
              />
            ) : (
              <SyncAltIcon
                style={{ color: "rgb(42, 187, 172)", fontSize: "3rem" }}
              />
            )}
          </p>{" "}
          <p className={classes1.from}>{props.to}</p>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
