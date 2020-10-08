import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import styles from "./addEditEmployeeDialog.module.scss";

const AddEditEmployeeDialog = ({
  open = false,
  handleClose,
  isEdit = false,
}: {
  open: boolean;
  isEdit: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog maxWidth="lg" open={open} aria-labelledby="employee-form-dialog-title">
      <div className={styles.employeeDialog}>
        <DialogTitle id="employee-form-dialog-title">
          {isEdit ? "Edit" : "Add"} Employee
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <div >
              <TextField className={styles.textField} variant="outlined" label="Employee Name" />
            </div>
            <div>
              <TextField className={styles.textField}
                variant="outlined"
                label="Employee Code"
                type="number"
              />
            </div>
            <div>
              <TextField className={styles.textField} variant="outlined" label="Project Assigned" />
            </div>
            <div>
              <TextField className={styles.textField} variant="outlined" label="Technology Stack" />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary">
            {isEdit ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddEditEmployeeDialog;
