import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();
  // <Alert severity="error">This is an error alert — check it out!</Alert>
  // <Alert severity="warning">This is a warning alert — check it out!</Alert>
  // <Alert severity="success">This is a success alert — check it out!</Alert>
  if (props.color === "orange")
    return (
      <div className={classes.root} style={{ marginTop: "25px" }}>
        <Alert severity="warning">{props.message}</Alert>
      </div>
    );
  else if (props.color === "red")
    return (
      <div className={classes.root} style={{ marginTop: "25px" }}>
        <Alert severity="error">{props.message}</Alert>
      </div>
    );
  else
    return (
      <div className={classes.root} style={{ marginTop: "25px" }}>
        <Alert severity="info">{props.message}</Alert>
      </div>
    );
}
