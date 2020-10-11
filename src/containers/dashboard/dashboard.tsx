import React, { Fragment, useCallback, useEffect, useState } from "react";
import AddEditEmployeeDialog from "../../components/employee-table/add-edit-employee/addEditEmployeeDialog";
import ConfirmationDialog from "../../components/employee-table/confirmation-dialog/confirmationDialog";
import EmployeeTable from "../../components/employee-table/employeeTable";
import CustomPagination from "../../components/employee-table/paginator/pagination";
import styles from './dashboard.module.scss';
import { connect } from "react-redux";
import { RootState } from "../../models/rootState.model";
import { fetchEmployees } from "../../store/actions/employee";
import { initialPagintaion } from "../../utils/utils";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';
import { Employee } from "../../models/employee.model";

const Dashboard = (props: any) => {
  const { getAllEmployees } = props;

  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedEmployee, setSeletedEmployee] = useState(null);

  const getUserQuery = useCallback(() => {
    const {limit = initialPagintaion.limit, skip = initialPagintaion.skip} 
    = queryString.parse(props.location.search);
    
      props.history.push({
        pathname: '/',
        search: `limit=${limit}&skip=${skip}`
      });

    getAllEmployees(limit, skip);
  }, [getAllEmployees, props.location.search, props.history])
  
  useEffect(() => {
    getUserQuery();
  }, [getUserQuery])

  const openEmployeeDialogByType = (isEdit: boolean, employee?: Employee) => {
    if(employee) {
      setSeletedEmployee(employee as any);
    }
    setOpenEmployeeDialog(true);
    setIsEdit(isEdit);
  }

  return (
    <Fragment>
      <div className={styles.dashboard}>
      <EmployeeTable loading={props.loading} addNew={openEmployeeDialogByType} employees={props.employees} />
      <div className={styles.customPagination}>
      <CustomPagination totalPages={props.totalPages} loading={props.loading} />
      </div>
      </div>
      {openEmployeeDialog && <AddEditEmployeeDialog open={openEmployeeDialog} employee={selectedEmployee} isEdit={isEdit} handleClose={() => setOpenEmployeeDialog(false)}/>}
      <ConfirmationDialog open={openConfirmationDialog}handleClose={() => setOpenConfirmationDialog(false)} />
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  const { loading ,employees, totalPages, currentPage } = state.employee;
    return {
      employees,
      currentPage,
      totalPages,
      loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllEmployees: (limit: number, skip: number) => {
      dispatch(fetchEmployees(limit, skip))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
