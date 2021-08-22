import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";

export default function AlertDialog() {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const toHome = () => {
    localStorage.clear();
    history.push("/login");
  };

  const handleClose = () => {
    // setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Session Time Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your session has expired. Please login again...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: "teal", color: "white" }}
            onClick={toHome}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
