import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import styles from "./addEditEmployeeDialog.module.scss";
import loginRegisterForm from './addEditEmployeeForm';
import { convertFormToArray, updateControls } from "../../../utils/utils";
import { connect } from "react-redux";
import { RootState } from "../../../models/rootState.model";
import { addNewEmployee, editEmployee } from "../../../store/actions/employee";
import { Employee } from "../../../models/employee.model";

const AddEditEmployeeDialog = ({
  open = false,
  handleClose,
  isEdit = false,
  onAddNewEmployee,
  loading,
  employee,
  onEditEmployee
}: {
  open: boolean;
  isEdit: boolean;
  handleClose: () => void;
  onAddNewEmployee?: any;
  loading?: any,
  employee?: any,
  onEditEmployee? : any
}) => {
  const [controls, setControls] = useState(loginRegisterForm);

  const setEmployeeDetails = useCallback(() => {
    if (employee) {
      setControls((oldControls: any) => {
        const newState = {...oldControls};
        for (const key in newState) {
          if (key === 'employeeCode') {
            newState[key].value = employee._id;
            newState[key].disabled = true;
          }else {
            newState[key].value = employee[key];
          }
        }

        return newState;
      })
    }
  }, [employee])

  useEffect(() => setEmployeeDetails(), [setEmployeeDetails]);
  
  let formData: any = [];

  const setInputControl = (event: any) => {
    event.persist();
    const value = event.target.value;
    const type = event.target.name;

    setControls(updateControls(type, value))
  }

  const onAddEditClicked = () => {
    const finalObj: any = {};

    for (const form of formData) {
      finalObj[form.name] = form.value;
    }

    if(isEdit) {
      onEditEmployee(finalObj);
    }else {
      onAddNewEmployee(finalObj)
    }
  }

  if(loading) {
    handleClose();
  }

  const getForm = () => {
    formData = convertFormToArray(controls, !isEdit ? 'employeeCode': '');
    return formData;
  }

  return (
    <Dialog maxWidth="lg" open={open} aria-labelledby="employee-form-dialog-title">
      <div className={styles.employeeDialog}>
        <DialogTitle id="employee-form-dialog-title">
          {isEdit ? "Edit" : "Add"} Employee
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
          {getForm().map((form: any) => <div key={form.key}><TextField className={styles.textField} onChange={setInputControl} {...form} /></div> )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onAddEditClicked} color="primary">
            {isEdit ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => {
  const { loading } = state.employee;
  return {
    loading
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddNewEmployee: (data: any) => {
      dispatch(addNewEmployee(data))
    },
    onEditEmployee: (employee: Employee) => {
      dispatch(editEmployee(employee))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditEmployeeDialog);
