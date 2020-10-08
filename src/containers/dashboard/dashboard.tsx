import React, { Fragment, useState } from "react";
import AddEditEmployeeDialog from "../../components/employee-table/add-edit-employee/addEditEmployeeDialog";
import ConfirmationDialog from "../../components/employee-table/confirmation-dialog/confirmationDialog";
import EmployeeTable from "../../components/employee-table/employeeTable";

const Dashboard = () => {
    const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(true);

  return (
    <Fragment>
      <EmployeeTable />
      <AddEditEmployeeDialog open={openEmployeeDialog} isEdit={true} handleClose={() => setOpenEmployeeDialog(false)}/>
      <ConfirmationDialog open={openConfirmationDialog}handleClose={() => setOpenConfirmationDialog(false)} />
    </Fragment>
  );
};

export default Dashboard;
