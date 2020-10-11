import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Action from "./action/action";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styles from './employeeTable.module.scss';
import { Employee } from "../../models/employee.model";
import CircularProgress from '@material-ui/core/CircularProgress';
import tableHeader from './employeeTableHeader';
import { connect } from "react-redux";
import { deleteEmployee } from "../../store/actions/employee";
import ConfirmationDialog from "../../components/employee-table/confirmation-dialog/confirmationDialog";

const actionItems = [
  { name: "Edit", id: 1 },
  { name: "Delete", id: 2 },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface employeeTableProps {
  addNew: (type: boolean, employee?: any) => void;
  employees: Employee[];
  loading: boolean;
  onDeleteEmployee?: any;
  onEditEmployee?: any
}

const EmployeeTable = (props: employeeTableProps) => {
  const classes = useStyles();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState({state: false, id: ''});

  const onChangeAction = (actionType: string, item: Employee) => {
    if (actionType === 'delete') {
      setOpenConfirmationDialog({state: true, id: item._id});
    }

    if(actionType === 'edit') {
      props.addNew(true, item);
    }
  }

  const onDeleteConfirmed = (id: string) => {
    props.onDeleteEmployee(id);
    setOpenConfirmationDialog({state: false, id: ''});
  } 

  let content = null;

  if(!props.loading) {
    content = <Fragment>
      <div className={styles.employeeTableHeader}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />} 
        onClick={() => props.addNew(false)} >
        Add New
      </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map(header=> <TableCell key={header.key} align={header.align as 'left' | 'right' | 'center'}>{header.name}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.employees.map((row: any) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">{row.projectAssigned}</TableCell>
                <TableCell align="left">{row.technologyStack}</TableCell>
                <TableCell align="left">
                  <Action onAction={(actionType: string) => onChangeAction(actionType.toLowerCase(), row)} items={actionItems} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog open={openConfirmationDialog.state} id={openConfirmationDialog.id} onConfirm={onDeleteConfirmed} handleClose={() => setOpenConfirmationDialog({state: false, id: ''})} />
    </Fragment>
  } else {
    content = <CircularProgress size={100} />
  }

  return (
    <div className={styles.employeeTable}>
      {content}
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDeleteEmployee: (employeeId: string) => {
      dispatch(deleteEmployee(employeeId))
    }
  }
}

export default connect(null, mapDispatchToProps)(EmployeeTable);
