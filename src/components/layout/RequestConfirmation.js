import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOpen(props.showBox);
  }, [props.showBox]);

  const deleteHandle = () => {
    props.delete();
    props.setShowBox(false);
    setOpen(false);
  };

  const handleClose = () => {
    props.setShowBox(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Connect with the user"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Press Connect to send request. Once you are connected, you can
            discuss further things on chat.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: " rgba(42, 187, 172, 1)",
              color: "white",
            }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: " rgba(42, 187, 172, 1)",
              color: "white",
            }}
            onClick={deleteHandle}
            color="primary"
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
