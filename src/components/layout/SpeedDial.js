import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteConformation from "./DeleteConformation";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <EditOutlinedIcon />, name: "Edit" },
  { icon: <DeleteIcon />, name: "Delete" },
];

export default function OpenIconSpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [showBox, setShowBox] = React.useState(false);
  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clicked = (e) => {
    if (e === "Delete") {
      console.log("setShowBox");
      setShowBox(true);
    } else if (e === "Edit") {
      props.edit();
    }
  };

  return (
    <div className={classes.root}>
      <DeleteConformation
        showBox={showBox}
        setShowBox={setShowBox}
        delete={props.delete}
      />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={
          <SpeedDialIcon
            style={{
              height: "55px",
              width: "60px",
              padding: "15px",
              borderRadius: "50%",
              backgroundColor: "#00b0ff",
            }}
            openIcon={
              <EditIcon
                style={{ borderRadius: "50%", backgroundColor: "#00b0ff" }}
              />
            }
          />
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            ButtonProps={{ color: "secondary" }}
            tooltipTitle={action.name}
            onClick={() => {
              clicked(action.name);
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
