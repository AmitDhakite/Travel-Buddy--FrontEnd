import React, { useState } from "react";
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
import axios from "../../axios.js";
import Backdrop from "../layout/Backdrop";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Travel Buddy</Link> {new Date().getFullYear()}
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

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((p) => {
      return { ...p, [name]: value };
    });
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/register", user);

      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {loading && <Backdrop />}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src={tb} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            onSubmit={submitHandler}
            className={classes.form}
            style={{ marginTop: "30px" }}
            noValidate
          >
            <Grid container spacing={3} onChange={inputChangeHandler}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={user.lastName}
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  value={user.email}
                  name="email"
                  label="Email Address"
                  fullWidth
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="phone"
                  value={user.mobile}
                  name="mobile"
                  label="Mobile No."
                  fullWidth
                  autoComplete="mobile no"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  value={user.addressLine1}
                  name="addressLine1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  value={user.addressLine2}
                  name="addressLine2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  value={user.city}
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  value={user.state}
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zipCode"
                  value={user.zipCode}
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  value={user.country}
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  value={user.password}
                  label="Password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "rgb(42, 187, 172)",
                marginTop: "50px",
              }}
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
