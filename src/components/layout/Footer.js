import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Love from "@material-ui/icons/FavoriteBorder";
import cyan from "@material-ui/core/colors/cyan";
import InstagramIcon from "@material-ui/icons/Instagram";
import FavoriteIcon from "@material-ui/icons/Favorite";
import classes1 from "../../styles/Footer.module.css";
function Copyright() {
  return (
    <Typography
      variant="body2"
      style={{ color: "white", marginTop: "8px" }}
      color="textSecondary"
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Travel Buddy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "50vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: cyan[900],
  },
}));

export default function StickyFooter({ homepage }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography
            className={classes1.amit}
            style={{ color: "white" }}
            variant="body1"
          >
            Made with{" "}
            {/* <Love style={{ color: "red", marginBottom: "-5px" }} /> */}
            <FavoriteIcon style={{ color: "white", marginBottom: "-5px" }} /> by
            AMIT DHAKITE
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
