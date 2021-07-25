import React, { useState, useEffect } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import classes1 from "../../styles/ToHome.module.css";
import tb from "../../images/tb1.png";
import Backdrop from "../layout/Backdrop";
import Snackbar from "../layout/Snackbar";
import axios from "../../axios.js";
import Alert from "../layout/Alert";

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
      "url(https://images.unsplash.com/photo-1587465420095-0fb0d52c1b24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1994&q=80)",
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

  const [snackbar, setSnackbar] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  useEffect(() => {
    if (query.get("registered") === "true") {
      setSnackbar(true);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNotFilledMessage, setShowNotFilledMessage] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };

  const login = async (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setShowNotFilledMessage(true);
      setShowMessage(false);
      return;
    } else setShowNotFilledMessage(false);
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", user);
      if (res.data.message.message === "Incorrect email or password.") {
        setLoading(false);
        setShowMessage(true);
      } else history.push("/dashboard");
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {snackbar && <Snackbar mes="Registered Successfully!!" />}
      {loading && <Backdrop />}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src={tb} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={login} noValidate>
            <TextField
              className="textField"
              margin="normal"
              onChange={inputChangeHandler}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="false"
              autoFocus
              value={user.email}
              autoFill="false"
            />

            <TextField
              className="textField"
              margin="normal"
              onChange={inputChangeHandler}
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={user.password}
              autoComplete="false"
              autoFocus
              autoFill="false"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {showNotFilledMessage && (
              <Alert
                color="orange"
                message="Please fill out all the requierd fields!"
              />
            )}
            {showMessage && (
              <Alert color="red" message="Invalid Email or Password!" />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "rgb(42, 187, 172)" }}
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  style={{ color: "rgb(42, 187, 172)" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  style={{ color: "rgb(42, 187, 172)" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div onClick={toHome}>
              <HomeIcon className={classes1.toHome} />
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
