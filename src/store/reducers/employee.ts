import EmployeeState, { EmployeePayload } from "../../models/employee.model";
import { updateEmployeesByAction, updateObject } from "../../utils/utils";
import { ADD_NEW_EMPLOYEE_INIT, ADD_NEW_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_INIT, DELETE_EMPLOYEE_SUCCESS, EDIT_EMPLOYEE_INIT, EDIT_EMPLOYEE_SUCCESS, FETCH_EMPLOYEES_INIT, FETCH_EMPLOYEES_SUCCESS } from "../actions/actionTypes";

export const initialState: EmployeeState = {
    loading: false,
    employees: [],
    currentPage: 1,
    totalPages: 1
};

type actionType = { type: string, payload: EmployeePayload};

const updateLoading = (state: EmployeeState) => {
    return updateObject(state, { loading: true })
} 

const fetchEmployeesSuccess = (state: EmployeeState, action: actionType) => {
    const { payload: { employees, totalPages, currentPage , } } = action;
    return updateObject(state, { employees, totalPages, currentPage, loading: false});
}

const appendNewEmployee = (state: EmployeeState, action: actionType) => {
    const { payload: { employee } } = action;
    const employees = state.employees.concat(employee);
    return updateObject(state, { employees, loading: false });
}

const updateEmployee = (state: EmployeeState, action: actionType) => {
    const { payload: { employee } } = action;
    return updateEmployeesByAction(state, 'edit', employee);
}

const delteEmployee = (state: EmployeeState, action: actionType) => {
    const { payload: { employee } } = action;
    return updateEmployeesByAction(state, 'delete', employee);
}

const reducer = (state = initialState, action: actionType ) => {
    switch (action.type) {
       case FETCH_EMPLOYEES_INIT: {
           return updateLoading(state);
       }
       
       case FETCH_EMPLOYEES_SUCCESS: {
           return fetchEmployeesSuccess(state, action);
       }

       case ADD_NEW_EMPLOYEE_INIT: {
           return updateLoading(state);
       }

       case ADD_NEW_EMPLOYEE_SUCCESS: {
           return appendNewEmployee(state, action);
       }

       case EDIT_EMPLOYEE_INIT: {
            return updateLoading(state)
       }

       case EDIT_EMPLOYEE_SUCCESS: {
           return updateEmployee(state, action)
       }

       case DELETE_EMPLOYEE_INIT: {
           return updateLoading(state);
        }
        
        case DELETE_EMPLOYEE_SUCCESS: {
            return delteEmployee(state, action);
       }
    }
    
    return state;
}

export default reducer;