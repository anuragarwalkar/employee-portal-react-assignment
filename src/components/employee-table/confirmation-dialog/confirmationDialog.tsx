import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from '@material-ui/core/DialogContentText';

const ConfirmationDialog = ({
  open = false,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={open} aria-labelledby="employee-form-dialog-title">
         <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this record? This process cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
