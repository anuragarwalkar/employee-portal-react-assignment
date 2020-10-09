import React, { Fragment, useState } from "react";
import AddEditEmployeeDialog from "../../components/employee-table/add-edit-employee/addEditEmployeeDialog";
import ConfirmationDialog from "../../components/employee-table/confirmation-dialog/confirmationDialog";
import EmployeeTable from "../../components/employee-table/employeeTable";
import CustomPagination from "../../components/employee-table/paginator/pagination";
import styles from './dashboard.module.scss';

const Dashboard = () => {
    const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  return (
    <Fragment>
      <div className={styles.dashboard}>
      <EmployeeTable addNew={() => setOpenEmployeeDialog(true)} />
      <div className={styles.customPagination}>
      <CustomPagination />
      </div>
      </div>
      <AddEditEmployeeDialog open={openEmployeeDialog} isEdit={true} handleClose={() => setOpenEmployeeDialog(false)}/>
      <ConfirmationDialog open={openConfirmationDialog}handleClose={() => setOpenConfirmationDialog(false)} />
    </Fragment>
  );
};

export default Dashboard;
