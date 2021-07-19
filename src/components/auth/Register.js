import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "../layout/HomeIcon";
import { useHistory } from "react-router-dom";
import classes from "../../styles/ToHome.module.css";
import tb from "../../images/tb1.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1550420394-5739fbf73ec8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgb(42, 187, 172)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "rgb(42, 187, 172)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    backgroundColor: "rgb(42, 187, 172)",
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();
  const toHome = () => {
    history.push("/");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src={tb} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              className="textField"
              margin="normal"
              required
              fullWidth
              id="name"
              label="First Name"
              name="firstName"
              autoComplete="false"
              autoFocus
              autoFill="false"
            />
            <TextField
              className="textField"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="false"
              autoFocus
              autoFill="false"
            />
            <TextField
              className="textField"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="false"
              autoFocus
              autoFill="false"
            />
            <TextField
              className="textField"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Mobile No."
              name="mobile"
              autoComplete="false"
              autoFocus
              autoFill="false"
            />
            <TextField
              className="textField"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Password"
              name="password"
              type="password"
              autoComplete="false"
              autoFocus
              autoFill="false"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "rgb(42, 187, 172)" }}
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  style={{ color: "rgb(42, 187, 172)" }}
                >
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
            <div onClick={toHome}>
              <HomeIcon />
            </div>
            <Box mt={5}>
              <Copyright text="Unispade" />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
