import React, { useState } from "react";
import { purple } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Error from "../../layout/Error";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import cities from "./cities";
import {
  StateDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";
import Select from "react-select";
import classes from "../../../styles/AddTrip.module.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Alert from "../../layout/Alert";
import axios from "../../../axios.js";
import Backdrop from "../../layout/Backdrop";
import Snackbar from "../../layout/Snackbar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  switchBase: {
    color: "red",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [roundTrip, setRoundTrip] = useState(false);
  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      "&$checked": {
        color: purple[500],
      },
      "&$checked + $track": {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const handleClickOpen = () => {
    setOpen(true);
    setNewTrip({
      userId: localStorage.getItem("userId"),
      from: "",
      to: "",
      startDate: "",
      endDate: "",
      twoWay: false,
      transport: "",
      noOfPeople: 0,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setNewTrip({
      userId: localStorage.getItem("userId"),
      from: "",
      to: "",
      startDate: "",
      endDate: "",
      twoWay: false,
      transport: "",
      noOfPeople: 0,
    });
  };

  const [snackbar, setSnackbar] = useState(false);
  const [showError, setShowError] = useState(false);

  const classes1 = useStyles();
  const [newTrip, setNewTrip] = useState({
    userId: localStorage.getItem("userId"),
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    twoWay: false,
    transport: "",
    noOfPeople: 0,
  });

  const newTripChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewTrip((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
    console.log(newTrip);
  };

  const fromCityChangeHandler = (e) => {
    const value = e.value;
    setNewTrip((p) => {
      return {
        ...p,
        from: value,
      };
    });
    console.log(newTrip);
  };
  const toCityChangeHandler = (e) => {
    const value = e.value;
    setNewTrip((p) => {
      return {
        ...p,
        to: value,
      };
    });
    console.log(newTrip);
  };
  const transportChangeHandler = (e) => {
    const value = e.value;
    setNewTrip((p) => {
      return {
        ...p,
        transport: value,
      };
    });
    console.log(newTrip);
  };
  const personsChangeHandler = (e) => {
    const value = e.value;
    setNewTrip((p) => {
      return {
        ...p,
        noOfPeople: value,
      };
    });
    console.log(newTrip);
  };

  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event) => {
    setRoundTrip(event.target.checked);
    const value = event.target.checked;
    setNewTrip((p) => {
      return {
        ...p,
        twoWay: value,
      };
    });
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const transports = [
    {
      label: "Flight",
      value: "Flight",
    },
    {
      label: "Train",
      value: "Train",
    },
    {
      label: "Bus",
      value: "Bus",
    },
    {
      label: "Cab",
      value: "Cab",
    },
    {
      label: "Own Vehicle",
      value: "Own Vehicle",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [mes, setMes] = useState("");
  const token = localStorage.getItem("token");
  const [showMes, setShowMes] = useState(false);
  const addNewTrip = async () => {
    setShowMes(false);
    if (
      newTrip.from === "" ||
      newTrip.to === "" ||
      newTrip.startDate === "" ||
      newTrip.noOfPeople === 0 ||
      (newTrip.twoWay && newTrip.endDate === "")
    ) {
      setMes("Please fill out all the necessary details...");
      setShowMes(true);
      return;
    }
    if (newTrip.from === newTrip.to) {
      setShowMes(true);
      setMes("Start point and end point cannot be same...");
      return;
    }
    if (!newTrip.twoWay) newTrip.endDate = "";
    const start = new Date(newTrip.startDate).getTime();
    const end = new Date(newTrip.endDate).getTime();
    if (newTrip.twoWay && start >= end) {
      setShowMes(true);
      setMes("Start date should be less than end date...");
      return;
    }
    const currentDate = new Date().getTime();
    if (currentDate >= start || (newTrip.twoWay && currentDate >= end)) {
      setShowMes(true);
      setMes("Travel dates should be future dates...");
      return;
    }
    try {
      const res = await axios.post("/addTrip", newTrip, {
        headers: { authorization: "Bearer " + token },
      });
      console.log(res.data);
      setOpen(false);
      setSnackbar(true);
      props.addNewTrip(newTrip);
    } catch (e) {
      setShowError(true);
      console.log(e);
    }
    setLoading(false);
  };
  const numberOfPersons = [];
  for (var i = 1; i < 100; i++) {
    numberOfPersons.push({ label: i, value: i });
  }

  return (
    <div>
      {loading && <Backdrop />}
      {snackbar && <Snackbar mes="Trip Added Successfully!!" />}
      {showError && <Error />}
      <Button
        variant="outlined"
        style={{
          fontSize: "1rem",
          marginTop: "50px",
          padding: "6px",
          width: "100%",
          backgroundColor: "rgb(42, 187, 172)",
          color: "white",
        }}
        onClick={handleClickOpen}
      >
        Add New Trip
      </Button>
      <Dialog
        style={{}}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.addTripModal}>
          <DialogTitle
            id="form-dialog-title"
            style={{ fontWeight: "600", color: "rgb(42, 187, 172)" }}
          >
            Add Trip
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new trip and find new friends to travel with...
            </DialogContentText>
            <DialogContentText>
              When preparing to travel, lay out all your clothes and all your
              money. Then take half the clothes and twice the money.
            </DialogContentText>
            <br></br>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <Typography>Start Point</Typography>
                <Select
                  name="from"
                  options={cities}
                  isSearchable
                  onChange={fromCityChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Typography>End Point</Typography>
                <Select
                  name="to"
                  options={cities}
                  isSearchable
                  onChange={toCityChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Preferred Transport</Typography>
                <Select
                  name="transport"
                  options={transports}
                  isSearchable
                  onChange={transportChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Number of Persons Travelling</Typography>
                <Select
                  name="noOfPeople"
                  options={numberOfPersons}
                  isSearchable
                  onChange={personsChangeHandler}
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ display: "flex" }}>
                  <p>One Way</p>
                  <Switch
                    onChange={handleChange}
                    checked={state.checkedB}
                    color="primary"
                    style={{ color: "rgba(42, 187, 172)" }}
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <p>Round Trip</p>
                </div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>Start Date</Typography>
                <TextField
                  id="date"
                  name="startDate"
                  value={newTrip.startDate}
                  variant="outlined"
                  type="date"
                  defaultValue="2021-08-24"
                  className={classes1.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={newTripChangeHandler}
                />
              </Grid>
              {roundTrip && (
                <Grid item xs={12} lg={6}>
                  <Typography>Return Date</Typography>
                  <TextField
                    name="endDate"
                    value={newTrip.endDate}
                    id="date"
                    onChange={newTripChangeHandler}
                    variant="outlined"
                    type="date"
                    defaultValue="2021-08-30"
                    className={classes1.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          {showMes && <Alert message={mes} color="orange" />}
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{
                color: "rgb(42, 187, 172)",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setLoading(true);
                addNewTrip();
              }}
              style={{
                color: "rgb(42, 187, 172)",
              }}
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
